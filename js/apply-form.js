const steps = document.querySelectorAll(".form-step");
const nextButtons = document.querySelectorAll(".next-button");
const prevButtons = document.querySelectorAll(".prev-button");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");

let currentStep = 0;

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (validateStep()) { // Only proceed if validation passes
      steps[currentStep].classList.remove("active");
      progressSteps[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
      progressSteps[currentStep].classList.add("active");
      updateProgress();
    }
  });
});

prevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    progressSteps[currentStep].classList.remove("active");
    currentStep--;
    steps[currentStep].classList.add("active");
    progressSteps[currentStep].classList.add("active");
    updateProgress();
  });
});

function updateProgress() {
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;
  progress.style.width = `${progressPercentage}%`;
  progressSteps.forEach((step, index) => {
    step.classList.toggle("completed", index <= currentStep);
  });
}

function validateStep() {
  const inputs = steps[currentStep].querySelectorAll("input[required]");
  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
  }
  return true;
}
