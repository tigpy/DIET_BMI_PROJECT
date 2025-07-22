// Food Nutrition Search
function createNutritionCard(data) {
    const nutriments = data.nutriments || {};
    return `
        <div style="background:#fffbea;border-radius:10px;box-shadow:0 2px 8px #eee;padding:1rem;margin:1rem 0;max-width:350px;">
            <h3 style="margin:0 0 0.5rem 0;">${data.product_name || 'Unknown Food'}</h3>
            <div><b>Calories:</b> ${nutriments['energy-kcal'] ? nutriments['energy-kcal'] + ' kcal' : 'N/A'}</div>
            <div><b>Fat:</b> ${nutriments.fat ? nutriments.fat + ' g' : 'N/A'}</div>
            <div><b>Protein:</b> ${nutriments.proteins ? nutriments.proteins + ' g' : 'N/A'}</div>
            <div><b>Sugar:</b> ${nutriments.sugars ? nutriments.sugars + ' g' : 'N/A'}</div>
        </div>
    `;
}

function setupFoodSearch() {
    const searchForm = document.getElementById('foodSearchForm');
    const resultDiv = document.getElementById('foodResult');
    if (!searchForm || !resultDiv) return;
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('foodInput').value.trim();
        if (!query) return;
        resultDiv.innerHTML = 'Searching...';
        fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=1`)
            .then(res => res.json())
            .then(data => {
                if (data.products && data.products.length > 0) {
                    resultDiv.innerHTML = createNutritionCard(data.products[0]);
                } else {
                    resultDiv.innerHTML = '<div>No results found.</div>';
                }
            })
            .catch(() => {
                resultDiv.innerHTML = '<div>Error fetching data.</div>';
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupFoodSearch();
});
// BMI Calculator Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmiForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
        const age = document.getElementById('age') ? document.getElementById('age').value : '';
        const gender = document.getElementById('gender') ? document.getElementById('gender').value : '';
        if (!height || !weight) {
            alert('Please enter both height and weight.');
            return;
        }
        const bmi = (weight / ((height / 100) ** 2));
        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }
        const userData = {
            name,
            age,
            gender,
            height,
            weight,
            bmi: bmi.toFixed(2),
            category
        };
        localStorage.setItem('bmiUserData', JSON.stringify(userData));
        window.location.href = 'result.html';
    });
});
