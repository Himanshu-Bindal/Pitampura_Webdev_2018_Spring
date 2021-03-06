let products = []

function getProducts(done) {
  $.get('/products', (data) => {
    products = data
    done()
  })
}

function postProduct(product, done) {
  $.post('/products', product, (data) => {
    getProducts(done)
  })
}

$(function () {
  function refreshProducts () {
    let tableBody = $('#product-table-body')
    tableBody.empty()
    for (product of products) {
      tableBody.append(
        `<tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
        </tr>`
      )
    }

  }
  getProducts(refreshProducts)


  $('#product-submit').click(function (e) {
    e.preventDefault()
    postProduct({
      name: $('#product-name').val(),
      price: $('#product-price').val()
    }, refreshProducts)
  })
})
