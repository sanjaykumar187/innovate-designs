$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('nav a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

    // Modal functionality
    $('.portfolio-item').click(function() {
        var modalId = $(this).data('modal');
        $('#' + modalId).fadeIn().attr('aria-hidden', 'false');
    });

    $('.modal-close').click(function() {
        $(this).closest('.modal').fadeOut().attr('aria-hidden', 'true');
    });

    $('.modal').click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $(this).fadeOut().attr('aria-hidden', 'true');
        }
    });

    // Fade-in effect for sections on scroll
    $(window).scroll(function() {
        $('section').each(function() {
            var topOfElement = $(this).offset().top;
            var bottomOfWindow = $(window).scrollTop() + $(window).height();
            if (bottomOfWindow > topOfElement) {
                $(this).animate({ opacity: 1 }, 500);
            }
        });
    });

    // Form submission with AJAX
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        // Basic email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (name && email && message) {
            $.ajax({
                url: '/send-email',
                method: 'POST',
                data: { name, email, message },
                success: function(response) {
                    alert('Thank you, ' + name + '! Your message has been sent. Check your email for confirmation.');
                    $('#contact-form')[0].reset();
                },
                error: function() {
                    alert('Error sending message. Please try again later.');
                }
            });
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Request Quote button
    $('.request-quote').click(function() {
        var service = $(this).data('service');
        $('#message').val(I am interested in your ${service} service. Please provide more details.);
        $('html, body').animate({
            scrollTop: $('#contact').offset().top
        }, 1000);
    });

    // Razorpay Payment Integration
    $('.buy-now').click(function() {
        var product = $(this).data('product');
        var price = product.includes('Minimalist') ? 2000 : 5000; // Price in INR

        var options = {
            key: 'your-razorpay-key-id', // Razorpay dashboard se key ID daalein
            amount: price * 100, // Amount in paise (₹2000 = 200000 paise)
            currency: 'INR',
            name: 'Innovate Designs',
            description: Purchase: ${product},
            handler: function(response) {
                alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#2980b9'
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();
    });

    // Live Chat Functionality
    $('#chat-toggle').click(function() {
        $('#chat-box').fadeIn().attr('aria-hidden', 'false');
    });

    $('#chat-close').click(function() {
        $('#chat-box').fadeOut().attr('aria-hidden', 'true');
    });

    $('#chat-send').click(function() {
        var message = $('#chat-input').val();
        if (message) {
            $('#chat-messages').append(<p><strong>You:</strong> ${message}</p>);
            $('#chat-input').val('');
            $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);

            // Simulate a response (In real app, integrate with a chat API)
            setTimeout(() => {
                $('#chat-messages').append(<p><strong>Support:</strong> Thanks for your message! How can we assist you with ${message}?</p>);
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            }, 1000);
        }
    });

    $('#chat-input').keypress(function(e) {
        if (e.which === 13) {
            $('#chat-send').click();
        }
    });
});