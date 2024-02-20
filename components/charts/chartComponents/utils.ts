export const callAccessor = (accessor:any, d:[], i:number) => (
  typeof accessor === "function" ? accessor(d, i) : accessor
)