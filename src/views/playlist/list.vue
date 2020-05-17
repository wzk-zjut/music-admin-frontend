<template>
    <div>
        <el-dialog title="编辑歌单" :visible.sync="showEdit" @close="closeEdit">
            <el-form :model="editPlay">
                <el-form-item label="歌单名称:" label-width="100px">
                    <el-input v-model="editPlay.playName">
                    </el-input>
                </el-form-item>
                <el-form-item label="歌单描述:" label-width="100px">
                    <el-input v-model="editPlay.playWrite">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消
                </el-button>
                <el-button type="primary" @click="updatePlay">确 定
                </el-button>
            </div>
        </el-dialog>
        <el-input placeholder="请输入关键字" v-model="searchContent" style="width:300px" size="small"
            clearable>
        </el-input>
        <el-button type="primary" style="margin-left:30px" size="small" @click="searchList">搜索
        </el-button>
        <el-table v-loading="loading" :data="playlist" stripe>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="封面" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.picUrl" alt="" height="50">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="copywriter" label="描述"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editList(scope.row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="delList(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchList, update, del, search } from '@/api/playlist'
import scroll from '@/utils/scroll'
export default {
    data() {
        return {
            playlist: [],
            count: 50,
            loading: false,
            showEdit: false,
            searchContent: '',
            editPlay: {
                id: '',
                playName: '',
                playWrite: ''
            }
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
            this.editPlay.id = row._id
            this.editPlay.playName = row.name;
            this.editPlay.playWrite = row.copywriter
            this.showEdit = true
        },
        closeEdit() {
            this.showEdit = false;
            this.editPlay = {
                id: '',
                playName: '',
                playWrite: ''
            }
        },
        updatePlay() {
            update({
                _id: this.editPlay.id,
                name: this.editPlay.playName,
                copywriter: this.editPlay.playWrite
            }).then((res) => {
                if (res.data.modified > 0) {
                    this.$message.success('编辑成功')
                    this.closeEdit()
                    this.playlist = []
                    if (this.searchContent) {
                        this.searchList()
                    } else {
                        this.getList()
                    }
                } else {
                    this.$message.warning('编辑失败')
                }
            }).catch((err) => {

            })
        },
        delList(id) {
            this.$confirm('确定删除此歌单吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                del({ id, }).then((res) => {
                    if (res.data.deleted > 0) {
                        this.$message.success('删除成功')
                        this.playlist = []
                        if (this.searchContent) {
                            this.searchList()
                        } else {
                            this.getList()
                        }
                    } else {
                        this.$message.warning('删除失败')
                    }
                }).catch(() => {

                })
            }).catch(() => {

            })
        },
        searchList() {
            if (!this.searchContent) {
                this.playlist = []
                this.getList()
                return
            } else {
                search({
                    content: this.searchContent
                }).then((res) => {
                    if (res.data.length === 0) {
                        this.$message.warning('未搜索到歌单')
                        return
                    }
                    this.playlist = res.data
                })
            }
        }
    }
}
</script>

<style lang="stylus" scoped></style>