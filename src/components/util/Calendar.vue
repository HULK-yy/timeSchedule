<template>
    <div class="calendar">
        <div class="date-header">
            <div class="prev-month" @click="handlePrev"></div>
            <div class="show-date">{{ year }}年{{ ('0' +  month).slice(-2) }}月{{ ('0' + day).slice(-2) }}日</div>
            <div class="next-month" @click="handleNext"></div>
        </div>
        <div class="date-content">
            <div class="week-header">
                <div
                    v-for="item in ['日', '一', '二', '三', '四', '五', '六']"
                    :key="item"
                >
                    {{ item }}
                </div>
            </div>
            <div class="week-day">
                <div class="every-day"
                    v-for="item in 42"
                    :key="item"
                >
                    <div 
                        v-if="item-beginDay>0 && item-beginDay<=curDays"
                        :class="{
                            'now-day':`${year}-${month}-${item-beginDay}` === curDate,
                            'active-day':`${year}-${month}-${item-beginDay}` === `${year}-${month}-${day}`
                        }"
                        :data-day = "item - beginDay"
                        @click="handleChooseDay"
                    >
                        {{ item - beginDay }}
                    </div>
                    <div class="other-day" v-else-if="item-beginDay<=0">{{ prevDays + item - beginDay}}</div>
                    <div class="other-day" v-else>{{ item - curDays - beginDay }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            year: null,
            month: null,
            day: null,
            curDate: null
        }
    },
    created () {
        this.getInitTime();
    },
    methods: {
        getInitTime () {
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth() + 1;
            this.day = new Date().getDate();
            this.curDate = `${this.year}-${this.month}-${this.day}`
        },
        handleChooseDay (e) {
            this.day = e.target.dataset.day;
        },
        handlePrev () {
            if(this.month === 1){
                this.month = 12;
                this.year --;
            }else{
                this.month --;
            }
            this.computedDay();
        },
        handleNext () {
            if(this.month === 12){
                this.month = 1;
                this.year ++;
            }else{
                this.month ++;
            }
            this.computedDay();
        },
        computedDay () {
            const allDay = new Date(this.year, this.month, 0).getDate();
            if(this.day > allDay){
                this.day = allDay;
            }
        }
    },
    computed: {
        beginDay () {
            return new Date(this.year, this.month - 1, 1).getDay();
        },
        curDays () {
            return new Date(this.year, this.month, 0).getDate();
        },
        prevDays () {
            return new Date(this.year, this.month - 1, 0).getDate();
        }
    }
}
</script>

<style>
    .calendar {
        width: 400px;
        background-color: #fff;
        box-shadow: 0px 0px 8px #368de4;
    }

    .date-header {
        width: 100%;
        display: flex;
        line-height: 30px;
    }

    .prev-month,
    .next-month {
        border: 13px solid transparent;
        width: 0;
        height: 0;
        cursor: pointer;
    }

    .prev-month {
        border-right-color: #007fff;
    }

    .next-month {
        border-left-color: #007fff;
    }

    .show-date {
        flex: 1;
        text-align: center;
    }
    .week-header {
        display: flex;
    }

    .week-header > div {
        flex: 1;
        text-align: center;
        line-height: 30px;
        background-color: #007fff;
        color: #fff;
        font-weight: 600;
    }

    .week-day {
        width: 100%;
    }
    .every-day {
        display: inline-block;
        width: 14.28%;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
    }
    .other-day {
        color: #ccc;
    }
    .now-day {
        background-color: #007fff;
        color: #fff;
        font-weight: 600;
    }
    .active-day:not(.now-day) {
        color: #007fff;
        border: 2px solid #007fff;
        line-height: 46px;
    }
</style>