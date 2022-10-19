

export const updateObjectArr = (items, itemId, objPropName, newObjectProp) => {
  return (
    items.map(u => {
      if (u[objPropName] === itemId) {
        return { ...u, ...newObjectProp };
      }
      return u;
    }) 
  )
}
