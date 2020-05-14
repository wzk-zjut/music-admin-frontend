<template>
    <div>
        轮播图
    </div>
</template>

<script>
import { getList } from '@/api/swiper'
export default {
    data() {
        return {

        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            getList().then((res) => {
                console.log(res)
            })
        }
    }
}
</script>

<style lang="stylus" scoped></style>