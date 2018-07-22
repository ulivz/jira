<template>
  <div class="tool-box">
    <ul class="tool-collection">
      <li class="tool-unit tool-switch status-switch">
        <i-Switch @on-change="setStatusTextDisplay"/>
        <span>Show Status</span>
      </li>

      <li class="tool-unit tool-switch only-me">
        <i-Switch @on-change="setOnlyMe"/>
        <span>Only Me</span>
      </li>

      <li class="tool-unit">
        <span>Sprint: </span>
        <Select
          @on-change="setActiveSprintId"
          :value="acitveSprintId"
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
          @on-change="setActiveSortStrategy"
          :value="avtiveSortStrategy"
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
          :value="recentUpdatedDay"
          @on-change="setRecentUpdatedDay"
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
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Toolbox',

    computed: {
      ...mapState([
        'sprints',
        'sortOptions',
        'showStatusText',
        'acitveSprintId',
        'recentUpdatedDay',
        'avtiveSortStrategy',
        'recentUpdatedDayOptions'
      ])
    },

    methods: {
      ...mapMutations([
        'setOnlyMe',
        'setActiveSprintId',
        'setStatusTextDisplay',
        'setRecentUpdatedDay',
        'setActiveSortStrategy'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .tool-box {
    display: flex;
    transition: height 0.2s;
    margin-bottom: 10px;
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
  }
</style>

