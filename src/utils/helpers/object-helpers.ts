export const updateObjectInArray = (items: any[], itemId: any, objPropName: string, newObjectProps: Object) => {
   return items.map(u => u[objPropName] === itemId ? {...u, ...newObjectProps} : u)
}