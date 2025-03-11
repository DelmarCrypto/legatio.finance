// Prix simulés pour les collatéraux (en USD)
const prices = {
    bitcoin: 50000, // Exemple, à remplacer par une API réelle
    or: 1800,       // Prix par once
    argent: 25,     // Prix par once
    immobilier: 1000 // Prix par unité NFT immobilière
};

function updateCollateralPrice() {
    const collateralType = document.getElementById('collateral-type').value;
    const price = prices[collateralType];
    document.getElementById('collateral-price').textContent = `$${price.toLocaleString()}`;
}

function calculateLoan() {
    const collateralType = document.getElementById('collateral-type').value;
    const collateralAmount = parseFloat(document.getElementById('collateral-amount').value) || 0;
    const loanDuration = parseFloat(document.getElementById('loan-duration').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;

    // Calcul de la valeur totale du collatéral
    const collateralValue = collateralAmount * prices[collateralType];

    // LTV maximal de 70% (par exemple, ajustable selon vos règles)
    const ltv = 0.7;
    const loanAmount = collateralValue * ltv;

    // Calcul des intérêts
    const monthlyInterestRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanDuration));
    const totalPayment = monthlyPayment * loanDuration;
    const totalInterest = totalPayment - loanAmount;

    // Mise à jour du LTV
    document.getElementById('ltv-value').textContent = `${(ltv * 100).toFixed(0)}%`;

    // Affichage des résultats
    const resultsDiv = document.getElementById('loan-results');
    if (collateralAmount > 0 && loanDuration > 0 && interestRate > 0) {
        resultsDiv.innerHTML = `
            <p><strong>Montant du prêt :</strong> $${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            <p><strong>Paiement mensuel :</strong> $${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            <p><strong>Total des intérêts :</strong> $${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            <p><strong>Total à rembourser :</strong> $${totalPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        `;
        document.getElementById('loan-request-btn').classList.remove('hidden');
    } else {
        resultsDiv.innerHTML = '<p class="text-red-600">Veuillez remplir tous les champs correctement.</p>';
        document.getElementById('loan-request-btn').classList.add('hidden');
    }
}

function requestLoan() {
    alert('Fonctionnalité de demande de prêt à venir ! Connectez-vous avec MetaMask pour continuer.');
}

// Mettre à jour le prix du collatéral au chargement et à chaque changement
document.getElementById('collateral-type').addEventListener('change', updateCollateralPrice);
window.onload = updateCollateralPrice;
