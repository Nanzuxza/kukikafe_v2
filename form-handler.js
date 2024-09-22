document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(emailInput.value)) {
        emailError.classList.remove('hidden');
        return;
    } else {
        emailError.classList.add('hidden');
    }

    const formData = new FormData(this);

    Swal.fire({
        title: 'Mengirim pesan...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Pesan Anda telah berhasil dikirim.',
                    confirmButtonColor: '#10B981'
                });
                this.reset();
            } else {
                throw new Error('Respons server tidak sukses');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi.',
                confirmButtonColor: '#EF4444'
            });
        });
});

document.getElementById('email').addEventListener('input', function () {
    const emailError = document.getElementById('emailError');
    if (this.validity.valid) {
        emailError.classList.add('hidden');
    } else {
        emailError.classList.remove('hidden');
    }
});