<template>
  <ul class="tool-box">
    <li class="tool-unit tool-switch status-switch">
      <i-Switch v-model="_showStatusText"/>
      <span>Show Status</span>
    </li>

    <li class="tool-unit tool-switch only-me">
      <i-Switch v-model="_onlyMe"/>
      <span>Only Me</span>
    </li>

    <li class="tool-unit">
      <span>Sprint: </span>
      <Select
        v-model="_activeSprintId"
        :style="{ 'width': '200px' }"
        placeholder="Select a sprint"
      >
        <Option
          v-for="sprint in sprints"
          :value="sprint.id"
          :key="sprint.id"
        >{{ sprint.name }}
        </Option>
      </Select>
    </li>

    <li class="tool-unit sort-by">
      <span>Sort By: </span>
      <Select
        v-model="_activeSortStrategy"
        :style="{ 'width': '150px' }"
        placeholder="Select a sort strategy"
      >
        <Option
          v-for="option in sortOptions"
          :value="option.key"
          :key="option.key"
        >{{ option.text }}
        </Option>
      </Select>
    </li>

    <li class="tool-unit recent-update">
      <span>Recently updated(day(s)): </span>
      <RadioGroup
        v-model="_recentUpdatedDay"
        type="button"
      >
        <Radio
          v-for="option in recentUpdatedDayOptions"
          :key="option"
          :label="option"
        />
      </RadioGroup>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Toolbox',

    computed: {
      _showStatusText: {
        get() {
          return this.$store.state.showStatusText
        },
        set(value) {
          this.$store.commit('setShowStatusText', value)
        }
      },
      _onlyMe: {
        get() {
          return this.$store.state.onlyMe
        },
        set(value) {
          this.$store.commit('setOnlyMe', value)
        }
      },
      _activeSprintId: {
        get() {
          return this.$store.state.activeSprintId
        },
        set(value) {
          this.$store.commit('setActiveSprintId', value)
        }
      },
      _activeSortStrategy: {
        get() {
          return this.$store.state.avtiveSortStrategy
        },
        set(value) {
          this.$store.commit('setActiveSortStrategy', value)
        }
      },
      _recentUpdatedDay: {
        get() {
          return this.$store.state.recentUpdatedDay
        },
        set(value) {
          this.$store.commit('setRecentUpdatedDay', value)
        }
      },
      ...mapState([
        'sprints',
        'sortOptions',
        'recentUpdatedDayOptions'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .tool-box {
    transition: height .3s;
    overflow: hidden;
    margin-bottom: 10px;
    list-style: none;
    text-align: left;
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
      &:last-child {
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
</style>

