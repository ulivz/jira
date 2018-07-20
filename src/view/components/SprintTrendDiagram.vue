<template>
  <div class="sprint-trend-diagram default-jira-theme"
       :class="{'loading': loading, 'show-text': showStatusText, 'hide-text': !showStatusText}">
    <!-- TOOL BOX -->
    <div class="tool-box">

      <div class='tool-box-switch' @click="switchToolboxStatus">
        <Icon type="navicon"></Icon>
        <span class="tool-box-text">Advanced</span>
      </div>

      <DropdownTransition>
        <ul class="tool-collection" v-if="showToolBox">
          <li class="tool-unit tool-switch status-switch">
            <i-Switch v-model="showStatusText"></i-Switch>
            <span>Show Status</span>
          </li>

          <li class="tool-unit tool-switch only-me">
            <i-Switch v-model="onlyMe"></i-Switch>
            <span>Only Me</span>
          </li>

          <li class="tool-unit">
            <span>Sprint: </span>
            <Select placeholder="Select a sprint" v-model="acitveSprintId" style="width:200px">
              <Option v-for="sprint in sprints" :value="sprint.id" :key="sprint.id">{{ sprint.name }}</Option>
            </Select>
          </li>

          <li class="tool-unit sort-by">
            <span>Sort By: </span>
            <Select placeholder="Select a sort strategy" v-model="avtiveSortStrategy" style="width:150px">
              <Option v-for="option in sortOptions" :value="option.key" :key="option.key">{{ option.text }}</Option>
            </Select>
          </li>

          <li class="tool-unit recent-update">
            <span>Recently updated(day(s)): </span>
            <RadioGroup v-model="recentUpdatedDay" type="button">
              <Radio v-for="option in recentUpdatedDayOptions" :key="option" :label="option"></Radio>
            </RadioGroup>
          </li>
        </ul>
      </DropdownTransition>
    </div>

    <Table ref="table" border :loading="loading" :columns="columns" :data="data" size="large"></Table>
    <Loading v-show="loading" extra-classes="loading-background"></Loading>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { onlyMe, recentUpdate } from '../model/filters'
  import { sortByStatus, sortByDev, sortByQA } from '../model/sort'
  import { nextTick } from '../../utils/nextTick'
  import SprintTrendDiagramModel from '../model/SprintTrendDiagramModel'
  import Loading from './Loading.vue'
  import DropdownTransition from './DropdownTransition.vue'

  const diagramModel = new SprintTrendDiagramModel()
  const RECENT_UPDATED_DAY_OPTIONS = [1, 2, 7, 'default']
  const SORT_OPTIONS = [
    {
      key: 1,
      text: 'Default'
    },
    {
      key: 2,
      text: 'Status'
    },
    {
      key: 3,
      text: 'Dev'
    },
    {
      key: 4,
      text: 'QA'
    }
  ]

  export default {
    components: {
      Loading,
      DropdownTransition
    },
    data() {
      return {
        // sprint
        acitveSprintId: null,
        sprints: [],

        // sort
        sortOptions: SORT_OPTIONS,
        avtiveSortStrategy: SORT_OPTIONS[0].key,

        showToolBox: true,
        showStatusText: false,

        // filter
        onlyMe: false,

        // filter - re
        recentUpdatedDayOptions: RECENT_UPDATED_DAY_OPTIONS,
        recentUpdatedDay: RECENT_UPDATED_DAY_OPTIONS[RECENT_UPDATED_DAY_OPTIONS.length - 1],

        show: true,
        loading: true,
        columns: [],
        data: []
      }
    },
    methods: {
      setDisplayStatus(show) {
        this.show = show
      },
      switchToolboxStatus() {
        this.showToolBox = !this.showToolBox
      },
      setRenderData() {
        this.sprints = diagramModel.getSprints()
        this.acitveSprintId = diagramModel.getActiveSprintId()
        this.columns = diagramModel.getColumns()
        this.data = diagramModel.getTableData()
      },
      switchTeam(teamId) {
        this.loading = true
        diagramModel.switch(teamId)
          .then(() => nextTick())
          .then(() => {
            this.setRenderData()
            this.loading = false
          })
          .catch(error => {
            console.error(error)
            this.$Message.error('Server seems to be wrong. 😑')
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
      }
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
        console.log(val)
        this.executeFilter([{
          fn: recentUpdate,
          enable: val,
          extraParams: [val]
        }])
      },
      acitveSprintId(sprintId) {
        this.loading = true
        diagramModel.switch(this.currentTeamId, sprintId)
          .then(() => {
            requestAnimationFrame(() => {
              this.setRenderData()
              this.loading = false
            })
          })
      },
      avtiveSortStrategy(val) {
        this.executeSort([
          {
            fn: sortByStatus,
            enable: val === 2
          },
          {
            fn: sortByDev,
            enable: val === 3
          },
          {
            fn: sortByQA,
            enable: val === 4
          }
        ])
      }
    },
    computed: {
      ...mapState([
        'currentTeamId',
        'username',
        'auth'
      ])
    },
    mounted() {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.switchTeam(this.currentTeamId)
        })
      }, 500)
    }
  }
</script>

<style lang="scss">
  .sprint-trend-diagram {
    @extend %stripe-wrapper;
    font-size: 14px;
    font-family: Arial, sans-serif;
    padding-top: 20px;
    .tool-box {
      display: flex;
      transition: height 0.2s;
      margin-bottom: 10px;
      .tool-box-switch {
        transition: all 0.3s;
        flex: 0 0 150px;
        padding-top: 3px;
        text-align: left;
        cursor: pointer;
        .tool-box-text {
          padding-left: 5px;
        }
      }
      .tool-collection {
        flex: 1;
        list-style: none;
        text-align: left;
        transition: all 0.3s;
        overflow: hidden;
        .tool-unit {
          display: inline-block;
          cursor: pointer;
          margin-right: 35px;
          padding-bottom: 10px;
          span {
            transition: color 0.3s;
            color: #aaa;
            margin-left: 5px;
          }
          &:last-child{
            margin-right: 0;
          }
          &.tool-switch {
            .ivu-switch-checked {
              border-color: #f15c75;
              background-color: #f15c75;
            }
            .ivu-switch {
              &.ivu-switch-checked {
                & ~ span {
                  color: #f15c75;
                }
              }
            }
          }
        }
        .sort-by {
          display: inline-block;
        }
      }
    }

    .issue-id {
      a {
        font-weight: bold;
        color: #3b73af;
      }
    }
    .issue-issue-type {
      img {
        margin-top: 5px;
      }
    }
    .issue-assignee, .issue-qa {
      .ivu-table-cell {
        padding: 0 5px;
      }
      img {
        width: 100%;
        border-radius: 50% 50%;
        margin-top: 5px;
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
