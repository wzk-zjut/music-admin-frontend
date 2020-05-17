<template>
    <div>
        <el-table v-loading="loading" :data="blogList" stripe>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="nickName" label="发布人"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="delBlog(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getList, del } from '@/api/blog'
import scroll from '@/utils/scroll'
export default {
    data() {
        return {
            blogList: [],
            count: 50,
            loading: false
        }
    },
    created() {
        this.getList()
    },
    mounted() {
        scroll.start(this.getList)
    },
    methods: {
        getList() {
            this.loading = true
            getList({
                start: this.blogList.length,
                count: this.count
            }).then((res) => {
                // console.log(res)
                this.loading = false
                const data = res.data
                let _blogList = []
                for (let i = 0; i < data.length; i++) {
                    _blogList.push(JSON.parse(data[i]))
                }
                this.blogList = this.blogList.concat(_blogList)
                if (_blogList.length < this.count) {
                    scroll.end()
                }
            })
        },
        delBlog(row) {
            this.$confirm('确定删除此博客吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                del(row).then((res) => {
                    // console.log(res)
                    if (res.data.delBlogRes.deleted > 0) {
                        this.blogList = []
                        this.getList()
                        this.$message.success('删除成功')
                    } else {
                        this.$message.warning('删除失败')
                    }
                })
            }).catch(() => { })
        }
    }
}
</script>

<style>
</style>