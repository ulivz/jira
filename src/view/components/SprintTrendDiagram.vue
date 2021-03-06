<template>
  <div class="sprint-trend-diagram default-jira-theme"
       :class="{
        'loading': loading,
        'show-text': showStatusText,
        'hide-text': !showStatusText
        }">

    <DropdownTransition>
      <Toolbox v-show="showToolbox"/>
    </DropdownTransition>

    <Table
      ref="table" border
      :loading="loading"
      :columns="columns"
      :data="data"
      size="large"
    />

    <Loading
      v-show="loading"
      extra-classes="loading-background"
    />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { onlyMe, recentUpdate } from '../model/filters'
  import { deviceChange } from '../../utils/MediaUtil'
  import { sortByStatus, sortByDev, sortByQA } from '../model/sort'
  import { nextTick } from '../../utils/nextTick'
  import SprintTrendDiagramModel from '../model/SprintTrendDiagramModel'
  import Toolbox from './Toolbox.vue'
  import Loading from './Loading.vue'
  import DropdownTransition from './DropdownTransition.vue'

  const diagramModel = new SprintTrendDiagramModel()

  export default {
    components: { Loading, Toolbox, DropdownTransition },

    data() {
      return {
        loading: true,
        columns: [],
        data: []
      }
    },

    methods: {
      setRenderData() {
        this.setSprints(diagramModel.getSprints())
        this.setActiveSprintId(diagramModel.getActiveSprintId())
        this.columns = diagramModel.getColumns()
        this.data = diagramModel.getTableData()
      },

      switchTeam(teamId) {
        this.loading = true
        diagramModel.switch(teamId)
          .then(nextTick)
          .then(() => {
            this.setRenderData()
            this.loading = false
          })
          .catch(error => {
            console.error(error)
            this.$Message.error('Server seems to be wrong. 😑')
          })
      },

      handleSprintIdChange(sprintId) {
        this.loading = true
        diagramModel.switch(this.currentTeamId, sprintId)
          .then(() => {
            requestAnimationFrame(() => {
              this.setRenderData()
              this.loading = false
            })
          })
      },

      executeFilter(filterList) {
        this.loading = true
        this.data = diagramModel.getTableData({ filterList })
        requestAnimationFrame(() => {
          this.loading = false
        })
      },

      executeSort(sortList) {
        this.loading = true
        this.data = diagramModel.getTableData({ sortList })
        requestAnimationFrame(() => {
          this.loading = false
        })
      },

      ...mapMutations([
        'setActiveSprintId',
        'setSprints'
      ])
    },

    watch: {
      currentTeamId(id) {
        this.switchTeam(id)
      },

      showStatusText() {
        requestAnimationFrame(() => {
          this.$refs.table.handleResize()
        })
      },

      onlyMe(val) {
        this.executeFilter([{
          fn: onlyMe,
          enable: val,
          extraParams: [this.username]
        }])
      },

      recentUpdatedDay(val) {
        this.executeFilter([{
          fn: recentUpdate,
          enable: val,
          extraParams: [val]
        }])
      },

      activeSprintId(sprintId) {
        this.handleSprintIdChange(sprintId)
      },

      avtiveSortStrategy(val) {
        this.executeSort([
          { fn: sortByStatus, enable: val === 2 },
          { fn: sortByDev, enable: val === 3 },
          { fn: sortByQA, enable: val === 4 }
        ])
      }
    },

    computed: {
      ...mapState([
        'avtiveSortStrategy',
        'activeSprintId',
        'auth',
        'currentTeamId',
        'onlyMe',
        'recentUpdatedDay',
        'showStatusText',
        'showToolbox',
        'sprints',
        'username'
      ])
    },

    mounted() {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.switchTeam(this.currentTeamId)
        })
      }, 1000)

      deviceChange(() => {
        setTimeout(() => {
          this.handleSprintIdChange(this.activeSprintId)
        })
      })
    }
  }
</script>

<style lang="scss">
  .sprint-trend-diagram {
    @extend %stripe-wrapper;
    font-size: 14px;
    font-family: Arial, sans-serif;
    padding-top: 20px;
    @include scope-breakpoint($mobile) {
      padding-top: 12px;
    }

    .tool-box-switch {
      transition: all 0.3s;
      display: inline-block;
      padding-top: 3px;
      text-align: left;
      cursor: pointer;
      .tool-box-text {
        padding-left: 5px;
      }
    }

    @include scope-breakpoint($mobile) {
      .tool-box {
        display: none !important;
      }
    }

    .issue-id {
      .ivu-table-cell {
        padding: 0 10px;
      }
      a {
        font-weight: bold;
        color: #3b73af;
        @include scope-breakpoint($mobile) {
          font-size: 12px;
        }
      }
    }
    .issue-issue-type {
      img {
        margin-top: 5px;
      }
    }
    .issue-assignee, .issue-qa {
      text-align: center;
      .ivu-table-cell {
        padding: 0 5px;
      }
      img {
        width: 100%;
        border-radius: 50% 50%;
        margin-top: 5px;
      }
    }
    .issue-summary {
      .ivu-table-cell {
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 60px;
      }
    }
    .issue-points {
      .ivu-table-cell {
        padding: 0 10px;
      }
      .badge {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        color: rgba(51, 51, 51, 0.8);
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        line-height: 0.99;
        margin: 0;
        min-height: 16px;
        min-width: 25px;
        padding: 3px 5px 2px 5px;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        text-transform: uppercase;
      }
    }
    .loading-background {
      background-color: rgba(255, 255, 255, 0);
    }
    th.jira-status-column {
      line-height: 47px;
      text-align: center;
    }
    .jira-status-column {
      padding: 0;
      &.ivu-table-cell {

      }
      .ivu-table-cell {
        padding: 0;
        width: 100%;
        height: 100%;
        div {
          width: 100%;
          height: 100%;
        }
        [class*=status-] {
          @extend %single-line-text-overflow-ellipsis;
          line-height: 59px;
          text-align: center;
        }
      }
    }
    .jira-status-column {
      @include scope-breakpoint($mobile) {
        font-size: 12px;
      }
      .status-text {
        transition: all 0.3s;
      }
    }
    &.loading {
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      .ivu-spin-main {
        display: none;
      }
      table {
        min-height: 1000px;
      }
      .tool-box {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    &.hide-text {
      .jira-status-column {
        .status-text {
          opacity: 0.95;
          color: transparent;
        }
      }
    }
    &.show-text {
      .jira-status-column {

      }
    }
  }
</style>
