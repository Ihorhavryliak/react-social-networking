

export const updateObjectArr = (items: any, itemId: any, objPropName: any, newObjectProp: any) => {
  return (
    items.map( (u: any) => {
      if (u[objPropName] === itemId) {
        return { ...u, ...newObjectProp };
      }
      return u;
    }) 
  )
}
