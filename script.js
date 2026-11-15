
/* ==========================================
   3. TIZIMGA KIRISH (LOGIN)
========================================== */

// Login formasini topamiz
const loginForm = document.querySelector("#loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        // Sahifa yangilanishini to'xtatamiz
        event.preventDefault();

        // Email va parolni olamiz
        const email = document.querySelector("#loginEmail").value.trim();
        const password = document.querySelector("#loginPassword").value;

        try {

            // Login ma'lumotlarini serverga yuboramiz
            const javob = await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            });

            const natija = await javob.json();

            // Xatolikni tekshiramiz
            if (!javob.ok) {
                throw new Error(
                    natija.xabar || natija.message ||
                    "Login yoki parol noto'g'ri!"
                );
            }

            // JWT tokenni saqlaymiz
            sessionStorage.setItem("authToken", natija.token);

            // Foydalanuvchi ma'lumotlarini saqlaymiz
            sessionStorage.setItem(
                "yotoqxonaUser",
                JSON.stringify(natija.user)
            );

            // Kirish holatini belgilaymiz
            sessionStorage.setItem("isLoggedIn", "true");

            alert(natija.xabar || "Tizimga muvaffaqiyatli kirdingiz!");

            // Admin va talabani tegishli sahifaga yo'naltiramiz
            if (natija.user.role === "admin") {

                // Admin paneliga o'tadi
                window.location.href = "admin.html";

            } else {

                // Talaba shaxsiy kabinetiga o'tadi
                window.location.href = "kabinet.html";

            }

        } catch (xatolik) {

            alert("Xatolik: " + xatolik.message);

            console.log("Login xatosi:", xatolik);

        }

    });

}
