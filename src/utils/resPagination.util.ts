export const getPaginationObject = (page: number, limit: number, total: number) => {
  const totalPage = Math.ceil(total / limit);
  return {
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: total,
      totalPage: totalPage
    }
  }
}