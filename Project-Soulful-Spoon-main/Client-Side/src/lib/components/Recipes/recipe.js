export default function smoothScroll() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionID = this.getAttribute('href');
            const targetSection = document.querySelector(sectionID);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
