let inCart = 0; //items in cart
let not_empty = document.querySelector('.fa-circle');

//updating number of items in the cart from the first page
function updateCart (ticket_num = 0) {
    //console.log('button is pressed');
    if (ticket_num !== 0) {
        inCart = ticket_num;
    }
    else {
        inCart += 1;
    }

    if(inCart == 1) {
        let cart_msg = inCart + " Workshop in Cart";
        document.querySelector('.cart-msg').innerHTML = cart_msg;
        not_empty.style.display = 'inline'; 
        not_empty.style.right = '254px';
    }
    else if(inCart >= 10) {
        let cart_msg = inCart + " Workshop in Cart";
        document.querySelector('.cart-msg').innerHTML = cart_msg;
        not_empty.style.right = '262px';
    }
    else {
        let cart_msg = inCart + " Workshops in Cart";
        document.querySelector('.cart-msg').innerHTML = cart_msg;
        not_empty.style.right = '260px';
    }
    openCart();
    updatePrice();
}

//getting the number of tickets from workshop details page
function ticketsNumber() {
    let num_of_tickets = document.getElementById('amount').value;
    total_sum_msg = 'Subtotal: ' + num_of_tickets * 495 + ' EUR';
    document.querySelector('.subtotal').innerHTML = total_sum_msg;
    updateCart(num_of_tickets);
}

//opening cart
function openCart() {
    console.log('function is called');
    let cart_status = document.querySelector('.modal-cart');
    cart_status.style.display = 'inline';
    if(inCart > 1) {
        console.log('cart is not empty');

        //adding items to modal cart
        let cart_msg = document.querySelector('.cart-status-msg');
        cart_msg.innerHTML = inCart + ' Workshops In Cart';
        let mini_workshop = document.querySelector('.mini-workshop');
        let double_mini = mini_workshop.cloneNode(true);
        let modal_parent = document.querySelector('.parent-div');
        modal_parent.appendChild(double_mini);
    }
    else if (inCart == 1) {
        let cart_msg = document.querySelector('.cart-status-msg');
        cart_msg.innerHTML = inCart + ' Workshops In Cart';

        if(document.querySelector('.btn-checkout') == null ) {
            subtotal();
            createButton();
        }
    }
    else {
        document.querySelector('.mini-workshop').style.display = 'none';
    }
}

function closeCart() {
    let cart_status = document.querySelector('.modal-cart');
    cart_status.style.display = 'none';
}

//checkout button from cart modal
function createButton() {
    let btn = document.createElement('button');
    let checkout = document.createTextNode('Checkout');
    btn.appendChild(checkout);
    btn.onclick = userCheckout;
    document.querySelector('.modal-cart').appendChild(btn);
    btn.className = 'btn-checkout';
}

//calculating the total price at the checkout
function subtotal() {
    let total = document.createElement('p');
    let text_subtotal = document.createTextNode('SUBTOTAL');
    total.appendChild(text_subtotal);
    total.className = 'subtotal-par';
    let header = document.createElement('h2');
    let price = document.createTextNode(inCart * 495.00 + ' EUR');
    header.appendChild(price);
    header.className = 'total-price';
    document.querySelector('.modal-cart').appendChild(total);
    document.querySelector('.modal-cart').appendChild(header);
}


function updatePrice() {
    let price = document.querySelector('.total-price');
    price.innerHTML = inCart * 495.00 + ' EUR';
}

//creating checkout modal with user info
function userCheckout() {
    //opening modal for user checkout
    closeCart();

    let modal = document.querySelector('.checkout-modal');
    let modal_body = document.createElement('div');
    modal_body.className = 'modal-body';
    modal.appendChild(createForm(modal, modal_body));
    modal.style.display = 'inline';
}

//creating form with user's information
function createForm(modal, modal_body) {
    //let modal = document.querySelector('.checkout-modal');
    let title = document.createElement('div');
    title.className = 'title-checkout';
    let h1 = document.createElement('h1');
    let msg = document.createTextNode('Checkout');
    h1.appendChild(msg);
    let close = document.createElement('div');
    close.className = 'close';
    close.innerHTML = '<i class="fas fa-times"></i>';

    //closing the modal
    close.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    //adding elements to modal
    title.appendChild(h1);
    title.appendChild(close);
    modal_body.appendChild(title);

    let par = makeElement('some-text', 'p', 'What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.');
    modal_body.appendChild(par);

    let div_form = makeElement('form-div', 'div');
    //creating all the form fields
    div_form.appendChild(makeFormElement(modal_body, modal));
    modal_body.appendChild(div_form);
    return modal_body;
}

function makeFormElement(modal_body, modal) {
    //making form dynamically
    let form_el = makeElement('form-checkout', 'form');

    //name 
    let label_name = makeElement('name', 'label', 'First name');
    form_el.appendChild(label_name);
    let input_name = makeElement('name', 'input');
    input_name.setAttribute('placeholder', 'First name');
    form_el.appendChild(input_name);

    //last name
    let label_surname = makeElement('surname', 'label', 'Last name');
    form_el.appendChild(label_surname);
    let input_surname = makeElement('surname', 'input');
    input_surname.setAttribute('placeholder', 'Last name');
    form_el.appendChild(input_surname);

    //email
    let label_email = makeElement('email', 'label', 'Email');
    form_el.appendChild(label_email);
    let input_email = makeElement('email', 'input');
    input_email.setAttribute('placeholder', 'Email address');
    form_el.appendChild(input_email);

    //date and gender, one div, two columns
    let date_div = makeElement('date-gender', 'div'); //parent element for gender and date columns
    let date = makeElement('date-column', 'div'); //column div for date only
    let label_date = makeElement('date', 'label', 'Date of Birth');
    date.appendChild(label_date);
    let icon_field = makeElement('icon-field', 'div'); //adding icon
    icon_field.innerHTML = '<i class="far fa-calendar-minus"></i>';
    let input_date = makeElement('date', 'input');
    input_date.setAttribute('placeholder', 'DD.MM.YYYY.');
    icon_field.appendChild(input_date);
    date.appendChild(icon_field);
    date_div.appendChild(date);
    let gender = makeElement('gender-column', 'div');
    let label_gender = makeElement('gender', 'label', 'Gender');
    gender.appendChild(label_gender);  
    let input_gender = makeElement('gender', 'input', 'Ostalo');
    input_gender.setAttribute('placeholder', 'Gender');
    gender.appendChild(input_gender);
    date_div.appendChild(gender);
    form_el.appendChild(date_div);

    //address
    let label_address = makeElement('address', 'label', 'Address');
    form_el.appendChild(label_address);
    let input_address = makeElement('address', 'input');
    input_address.setAttribute('placeholder', 'Type your address here');
    form_el.appendChild(input_address);

    //zipcode
    let label_zipcode = makeElement('zipcode', 'label', 'Zip Code');
    form_el.appendChild(label_zipcode);
    let input_zipcode = makeElement('zipcode', 'input');
    input_address.setAttribute('placeholder', 'eg 21230');
    form_el.appendChild(input_zipcode);

    //checkbox
    let checkbox_div = makeElement('check-div', 'div');
    let input_box = makeElement('box', 'input');
    input_box.setAttribute('type', 'checkbox');
    //input_box.setAttribute('value', 'I agree');
    input_box.value = 'I agree';
    //let agree = makeElement('agree-text', 'p', 'I agree');
    checkbox_div.appendChild(input_box);
    //checkbox_div.appendChild(agree);
    form_el.appendChild(checkbox_div);

    //button
    let btn_finish = makeElement('final-check', 'button', 'Checkout');
    btn_finish.addEventListener('click', function() {
        modal_body.style.display = 'none';
        //console.log('some problem here');
        let newest = makeElement('new-modal', 'div');
        let paragrah = makeElement('parag', 'p', 'Thank you!');
        newest.appendChild(paragrah);
        modal.appendChild(newest);
        
    });
    form_el.appendChild(btn_finish);

    return form_el;
}

//quicker function for adding new elements
function makeElement(class_name, element_type, text = null) {
    let new_el = document.createElement(element_type);
    new_el.className = class_name;
     
    if(text != null) {
        let new_text = document.createTextNode(text);
        new_el.appendChild(new_text);
    }

    return new_el;
}