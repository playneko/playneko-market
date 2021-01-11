const CONST_LIST_PAGE_MAX = 8;
const CONST_PAGE_MAX = 5;

const getPaging = (total, page) => {
    const list = CONST_LIST_PAGE_MAX;
    const blockCnt = CONST_PAGE_MAX;
    const blockNum = Math.ceil(page / blockCnt);
    const blockStart = ((blockNum - 1) * blockCnt) + 1;
    var blockEnd = blockStart + blockCnt - 1;

    const totalPage = Math.ceil(total / list);
    if (blockEnd > totalPage) {
        blockEnd = totalPage;
    }
    // const totalBlock = ceil(totalPage / blockCnt);
    // const pageStart = (page - 1) * list;

    const thisPage = (page < 1 ? 1 : page - 1) * CONST_LIST_PAGE_MAX;

    return {
        total: totalPage,
        start: blockStart,
        end: blockEnd,
        thispage: thisPage
    };
}

module.exports = CONST_LIST_PAGE_MAX;
module.exports = CONST_PAGE_MAX;
module.exports = getPaging;