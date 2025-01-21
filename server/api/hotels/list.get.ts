export default defineEventHandler((_requestBody) => {
  debugger
  return [
    { name: `Hotel 1-${_requestBody}`, description: 'Desc 123' }
  ]
})
