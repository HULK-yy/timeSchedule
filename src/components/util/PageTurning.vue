<template>
    <div class="page-tool">
        <ul>
            <li v-for="(item, index) in pageNumList"
                :key="index"
                :class="{active: (item.text == quePage)}"
                @click="jumpTo(item.page)"
            >{{ item.text }}</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data () {
        return {
            quePage: 0,
            quePageSize: 0,
            queCount: 0,
            queIconCount: 0,
            pageNumList: []
        }
    },
    props: ['page', 'pageSize', 'iconCount'],
    mounted() {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.quePage = this.page;
            this.quePageSize = this.pageSize;
            this.queIconCount = this.iconCount;
            this.generatePageTool();
        }, 100);
    },
    computed: {
        ...mapState(['count']),
    },
    methods: {
        generatePageTool() {
            let nowPage = this.quePage;
            let pageSize = this.quePageSize;
            let totalCount = this.count;
            // let totalCount = this.queCount;
            let iconCount = this.queIconCount;
            let pageCount = parseInt((totalCount + pageSize - 1) / pageSize);
            let result = [];
            if (totalCount == 0) {
                return;
            }
            if (nowPage <= 3) {
                if (nowPage != 1) {
                result.push({ text: "<<", page: nowPage - 1 });
                }
                for (let i = 1; i <= nowPage; i++) {
                result.push({ text: i, page: i });
                }
                let term = pageCount - nowPage < iconCount - nowPage ? pageCount - nowPage : iconCount - nowPage;
                for (let i = 1; i <= term; i++) {
                result.push({ text: nowPage + i, page: nowPage + i });
                }
            } else {
                result.push({ text: "<<", page: nowPage - 1 });
                result.push({ text: nowPage - 2, page: nowPage - 2 });
                result.push({ text: nowPage - 1, page: nowPage - 1 });
                result.push({ text: nowPage, page: nowPage });
                if (nowPage + 1 <= pageCount) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
                }
                if (nowPage + 2 <= pageCount) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
                }
            }
            if (nowPage != pageCount) {
                result.push({ text: ">>", page: nowPage + 1 });
            }
            this.pageNumList = result;
        },
        jumpTo (page) {
            this.quePage = page;
            this.$listeners.click(this.quePage - 1, this.quePageSize);
            this.generatePageTool();
        }
    }
};
</script>


<style lang="less">
.page-tool{
    width: 1170px;
    margin: 30px auto;
    position: relative;
    ul {
        li{
            float: left;
            height: 30px;
            line-height: 30px;
            padding: 0px 12px;
            background-color: #fff;
            border: 1px solid #ddd;
            font-size: 14px;
            cursor: pointer;
            color: #337ab7;
        }
        li.active{
            background-color: #337ab7;
            color: #fff;
        }
        li:not(.active):hover{
            cursor: pointer;
            background-color: #eee;
        }
    }
}
</style>