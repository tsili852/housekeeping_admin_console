export default (val) => {
    const date = new Date(val);
    return date.toLocaleString(['el-GR'], {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});
}
