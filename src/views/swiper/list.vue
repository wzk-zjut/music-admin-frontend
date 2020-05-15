<template>
    <div>
        <div class="filter-container">
            <el-upload class="upload-demo" action="http://localhost:3000/swiper/upload"
                :on-success="uploadSuccess" :show-file-list="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <el-table v-loading="loading" :data="swiperList" stripe style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="图片" width="400">
                <template slot-scope="scope">
                    <el-image :src="scope.row.download_url" alt style="height:50px;width:108px"
                        :preview-src-list="imgList"></el-image>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import { getList, del } from '@/api/swiper'
export default {
    data() {
        return {
            swiperList: [],
            loading: false,
            imgList: []
        }
    },
    created() {
        this.getList()
    },
    watch: {
        swiperList() {
            this.imgList = []
            for (let i = 0; i < this.swiperList.length; i++) {
                this.imgList.push(this.swiperList[i].download_url)
            }
        }
    },
    methods: {
        getList() {
            this.loading = true
            getList().then((res) => {
                this.swiperList = res.data
                this.loading = false
            })
        },
        uploadSuccess(res) {
            if (res.id_list.length > 0) {
                this.$message.success('上传成功')
                this.getList()
            }
        },
        onDel(row) {
            if (this.swiperList.length === 1) {
                this.$message.warning('不能删除所有轮播图，至少保留一张！')
                return
            }
            this.loading = true
            this.$confirm('确定删除此图片吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                del(row).then((res) => {
                    this.loading = false
                    this.getList()
                    this.$message.success('删除成功')
                }).catch((err) => { })
            }).catch(() => { })
        }
    }
}
</script>

<style lang="stylus" scoped></style>