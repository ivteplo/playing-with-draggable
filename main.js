const list = document.querySelectorAll('li')
let draggedItem

list.forEach(listItem => {
  listItem.addEventListener('dragstart', () => {
    draggedItem = listItem
  })

  listItem.addEventListener('dragend', () => {
    draggedItem = null
  })

  listItem.addEventListener('dragover', (event) => {
    // It's required to preventDefault
    // in order to fire the `ondrop` event
    event.preventDefault()

    if (listItem !== draggedItem) {
      event.dataTransfer.dropEffect = 'move'
      listItem.classList.add('dragover')
    }
  })

  listItem.addEventListener('dragleave', () => {
    listItem.classList.remove('dragover')
  })

  listItem.addEventListener('drop', (event) => {
    event.preventDefault()

    const index = Array.prototype.indexOf.call(listItem.parentNode.children, listItem)
    const parent = listItem.parentNode

    parent.removeChild(listItem)
    draggedItem.replaceWith(listItem)
    parent.insertBefore(draggedItem, parent.children[index])

    listItem.classList.remove('dragover')
  })
})
