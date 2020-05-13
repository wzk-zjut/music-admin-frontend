<template>
    <div>
        <el-dialog title="编辑歌单"
            :visible.sync="showEdit"
            @close="closeEdit">
            <el-form :model="editPlay">
                <el-form-item label="歌单名称:"
                    label-width="100px">
                    <el-input
                        v-model="editPlay.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="歌单描述:"
                    label-width="100px">
                    <el-input
                        v-model="editPlay.copywriter">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                class="dialog-footer">
                <el-button @click="closeEdit">取 消
                </el-button>
                <el-button type="primary"
                    @click="updatePlay">确 定
                </el-button>
            </div>
        </el-dialog>
        <el-table v-loading="loading"
            :data="playlist" stripe>
            <el-table-column type="index"
                width="50">
            </el-table-column>
            <el-table-column label="封面"
                width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.picUrl"
                        alt="" height="50">
                </template>
            </el-table-column>
            <el-table-column prop="name"
                label="名称">
            </el-table-column>
            <el-table-column prop="copywriter"
                label="描述"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        @click="editList(scope.row)">
                        编辑
                    </el-button>
                    <el-button size="mini"
                        type="danger">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchList, update } from '@/api/playlist'
import scroll from '@/utils/scroll'
export default {
    data() {
        return {
            playlist: [],
            count: 50,
            loading: false,
            showEdit: false,
            editPlay: {}
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
            fetchList({
                start: this.playlist.length,
                count: this.count
            }).then((res) => {
                this.playlist = this.playlist.concat(res.data)
                if (res.data.length < this.count) {
                    scroll.end()
                }
                this.loading = false
            })
        },
        editList(row) {
            this.editPlay = row
            this.showEdit = true
        },
        closeEdit() {
            this.showEdit = false;
            this.editPlay = {}
        },
        updatePlay() {
            update(this.editPlay).then((res) => {
                if (res.data.errcode === 0) {
                    this.$message.success('编辑成功')
                    this.closeEdit()
                    this.getList()
                } else {
                    this.$message.warning('编辑失败')
                }
            }).catch((err) => {

            })
        }
    }
}
</script>

<style lang="stylus" scoped></style>