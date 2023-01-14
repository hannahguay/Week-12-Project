$(document).ready(() => {
    let orderList;

    //READ. The data returned from the GET request is passed as an argument to the
    //function, then it puts the returned data into the variable 'orderList'
    //and then calls the orderListInfo function
    $.get('http://localhost:3000/posts', data => {
        orderList = data
        orderInfoList()
    })
    
    //Takes the array of orders and for each order in orderList, add a new div, a delete button with a click event
    const orderInfoList = () => {
        $('#content').empty()
        orderList.forEach(order => {
            $('#content').append(
                `<div id="order${order.id}" class="info-box">
                ID: ${order.id} ${order.name} ${order.order}
                <button id=${order.id} class="btn btn-danger btn-sm">X</button>
                </div>`
            )
            $(`#${order.id}`).click(() => removeItem(order.id))
        })
    }

    //DELETE. Takes the id of the order and removes it from the database. On success, calls the orderInfoList function
    //to show the updated database. 
    const removeItem = id => {
        $.ajax({
            url: `http://localhost:3000/posts/${id}`,
            type: 'DELETE',
            success: function() {
                orderInfoList()
            }
        })
        alert(`Order with id of ${id} was deleted.`)
    }

    //CREATE. This function is listening for the submit event of a form,
    //then taking the form data and making a post request to the server.
    $('#myForm').submit(event => {
        event.preventDefault()
        const formData = {
            name: $('#name').val(),
            order: $('#order').val()
        }

        $.post('http://localhost:3000/posts',
            formData,
            data => {alert(`Order added: Name: ${data.name}, Order: ${data.order}`)}
        )
        //Resets the form fields.
        $('#myForm').trigger('reset')
    })

    //UPDATE. This function is listening for the submit event of a form,
    //taking the form data and making a PUT request to the server
    //with the id of the order to update.
    $('#myUpdateForm').submit(event => {
        event.preventDefault()
        const formData = {
            id: $('#updateId').val(),
            name: $('#updateName').val(),
            order: $('#updateOrder').val()
        }

        $.ajax({
            url: `http://localhost:3000/posts/${formData.id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        })
        //Resets the form fields.
        $('#myUpdateForm').trigger('reset')
    })
})