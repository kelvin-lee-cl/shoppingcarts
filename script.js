$(document).ready(function () {
    $('div.leftShoppingCarts tbody tr').each(function (i, ele) {
        console.log($(ele).children().first().text());
    });
});


$(document).ready(function () {
    $('div.leftShoppingCarts tbody tr').each(function (i, ele) {
        var unitCost = parseFloat($(ele).children('.unitCost').text());
        var quantity = parseFloat($(ele).children('.quantity').text());
        // market value is number of shares times market price per share
        var totalCost = unitCost * quantity;
        $(ele).children('.totalCost').html(totalCost);
    });
});



var sum = function (acc, x) { return acc + x; };
$(document).ready(function () {
    var sumCost = [];
    var maxLeadTime = 0; // Initialize maxLeadTime

    function updateTotalSumAndLeadTime() {
        // Recalculate total sum
        totalSum = sumCost.reduce(sum, 0);
        $("#totalSum").html(totalSum);

        // Calculate maximum lead time
        maxLeadTime = 0; // Reset maxLeadTime
        $('div.leftShoppingCarts tbody tr').each(function () {
            var leadTime = parseInt($(this).children('td:nth-child(4)').text(), 10); // Get lead time from the 4th column
            if (leadTime > maxLeadTime) {
                maxLeadTime = leadTime; // Update maxLeadTime if current lead time is greater
            }
        });
        $("#totalLeadTime").html(maxLeadTime); // Update the displayed maximum lead time
    }

    // New section for adding an item
    $('#addItemForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get values from the form
        var itemName = $('#itemName').val();
        var quantity = parseFloat($('#quantity').val());
        var unitCost = parseFloat($('#unitCost').val());
        var leadTime = parseInt($('#leadTime').val(), 10);
        var referenceLink = $('#referenceLink').val();
        var totalCost = unitCost * quantity; // Calculate total cost for the new item

        // Create a new row in the table with a remove button
        var newRow = `<tr>
            <td>${itemName}</td>
            <td class="quantity">${quantity}</td>
            <td class="unitCost">${unitCost.toFixed(2)}</td>
            <td class="leadTime">${leadTime}</td>
            <td><a href="${referenceLink}" target="_blank">Link</a></td>
            <td class="totalCost">${totalCost.toFixed(2)}</td>
            <td><button class="removeItem btn btn-danger">Remove</button></td>
        </tr>`;

        // Append the new row to the table
        $('div.leftShoppingCarts tbody').append(newRow);

        // Clear the form fields
        $('#addItemForm')[0].reset();

        // Update sumCost and recalculate total sum and lead time
        sumCost.push(totalCost);
        updateTotalSumAndLeadTime();
    });

    // Remove item functionality
    $('div.leftShoppingCarts tbody').on('click', '.removeItem', function () {
        var row = $(this).closest('tr');
        var totalCost = parseFloat(row.find('.totalCost').text());

        // Remove the row from the table
        row.remove();

        // Update the sumCost array and recalculate total sum and lead time
        sumCost = sumCost.filter(cost => cost !== totalCost); // Remove the cost of the removed item
        updateTotalSumAndLeadTime();
    });
});

