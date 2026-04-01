// FORM HANDLING LOGIC
const form = document.getElementById("my-form");
const container = document.getElementById("contact-form-container");
const btnText = document.getElementById("btn-text");

// Safety check
if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();   
 // Visual feedback to let the user know the message is being sent
        btnText.innerText = "SENDING...";
        const submitBtn = btnText.parentElement;
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;
// Prepare form data for the API request
        const data = new FormData(form);
        
        try {
 // Sending data to the action url defined in the HTML form attribute
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
// Success 
                container.innerHTML = `
                    <div class="text-center py-10 animate-pulse">
                        <div class="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white uppercase tracking-tighter">Message Sent!</h3>
                        <p class="text-gray-400 text-xs mt-2 font-mono"> Message received. I'll ping you back soon.</p>
                        <button onclick="location.reload()" class="mt-6 text-[10px] text-red-500 uppercase tracking-widest font-bold hover:underline cursor-pointer">
                            Send another?
                        </button>
                    </div>
                `;
            } else {
// Re-enable button if the server rejects the request
                btnText.innerText = "ERROR! TRY AGAIN";
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            }
        } catch (error) {
 // Handles internet issues or blocked requests
            alert("Internet issue? Connection failed, bhai.");
            btnText.innerText = "SEND MESSAGE";
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        }
    });
}