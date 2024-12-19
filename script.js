document.querySelectorAll('.question').forEach(item => {
    item.addEventListener('click', event => {
        const answer = item.nextElementSibling;
        const arrow = item.querySelector('.arrow');
        
        // Byt värdet på aria-expanded för att indikera om svaret är öppet eller stängt
        const isExpanded = item.getAttribute('aria-expanded') === 'true';
        
        // När svaret ska öppnas
        if (isExpanded) {
            answer.style.maxHeight = '1px'; // Changed from null to 1px for better transition
            void answer.offsetHeight;  // Trigger reflow
            
            // Nu stänger vi svaret
            answer.style.maxHeight = '0';
            arrow.style.transform = 'rotate(0deg)';
            item.setAttribute('aria-expanded', 'false');
        } else {
            // För att öppna svaret, sätt max-height till scrollHeight
            answer.style.maxHeight = answer.scrollHeight + 'px';
            arrow.style.transform = 'rotate(180deg)';
            item.setAttribute('aria-expanded', 'true');
        }
    });
});