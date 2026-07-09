const form = document.querySelector("#lead-form");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

if (form) {
  const email = form.querySelector("#email");
  const consent = form.querySelector('input[name="toestemming"]');
  const error = form.querySelector("#email-error");
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  const defaultButtonText = button.textContent;

  const showEmailError = () => {
    if (email.validity.valueMissing) {
      error.textContent = "Vul je e-mailadres in.";
    } else if (email.validity.typeMismatch) {
      error.textContent = "Controleer of je e-mailadres klopt.";
    } else {
      error.textContent = "";
    }
    email.setAttribute("aria-invalid", String(!email.validity.valid));
    return email.validity.valid;
  };

  email.addEventListener("blur", showEmailError);
  email.addEventListener("input", () => {
    if (email.getAttribute("aria-invalid") === "true") showEmailError();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const emailIsValid = showEmailError();
    if (!emailIsValid) {
      email.focus();
      return;
    }

    if (!consent.checked) {
      status.classList.add("error");
      status.textContent = "Vink aan dat we je de checklist per e-mail mogen sturen.";
      consent.focus();
      return;
    }

    if (form.action.includes("REPLACE_WITH_YOUR_FORM_ID")) {
      status.classList.add("error");
      status.textContent = "Het formulier is nog niet gekoppeld. Bel ons gerust op 06 53 43 22 60.";
      return;
    }

    button.disabled = true;
    button.textContent = "Even versturen…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      email.removeAttribute("aria-invalid");
      status.classList.add("success");
      status.textContent = "Gelukt! De inspiratiechecklist komt jouw kant op.";
    } catch {
      status.classList.add("error");
      status.textContent = "Versturen lukte niet. Probeer het opnieuw of bel 06 53 43 22 60.";
    } finally {
      button.disabled = false;
      button.textContent = defaultButtonText;
    }
  });
}
