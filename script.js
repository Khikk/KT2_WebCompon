class Calculator extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <form id="loan-form">
                <label>Сумма кредита:</label>
                <input type="number" id="count" placeholder="Введите сумму кредита"/>
                <label>Процентная ставка:</label>
                <input type="number" id="percent" placeholder="Введите процентную ставку"/>
                <label>Срок погашения:</label>
                <input type="number" id="term" placeholder="Введите срок погашения в годах"/>
                <input type="submit" value="Рассчитать" />
            </form>
            <div id="results" class="result">
                <h2>Результаты</h2>
                <p>Ежемесячный платеж: <span class='monthlyPayment'></span></p>
                <p>Общая сумма платежа: <span class='totalPayment'></span></p>
                <p>Общее количество процентов: <span class='sumPerc'></span></p>
            </div>
        `;
    }

    connectedCallback() {
        const countInp = this.querySelector("#count");
        const persInp = this.querySelector("#percent");
        const termInp = this.querySelector("#term");

        countInp.addEventListener("input", this.calculatePayment.bind(this));
        persInp.addEventListener("input", this.calculatePayment.bind(this));
        termInp.addEventListener("input", this.calculatePayment.bind(this));
    }

    calculatePayment() {
        let count = this.querySelector("#count").value;
        let perc = this.querySelector("#percent").value;
        let term = this.querySelector("#term").value;
        let monthlyperc = perc / 100 / 12;
        let payments = term * 12;
        let x = Math.pow(1 + monthlyperc, payments);
        let monthlyPayment = (count * x * monthlyperc) / (x - 1);
        monthlyPayment = monthlyPayment;
        let totalPayment = monthlyPayment * payments;
        let sumFirst = this.querySelector(".monthlyPayment");
        let sumSecond = this.querySelector(".totalPayment");
        let sumThird = this.querySelector(".sumPerc");
        sumFirst.innerHTML = monthlyPayment;
        sumSecond.innerHTML = totalPayment;
        sumThird.innerHTML = (totalPayment / count) * 100;
    }
}

window.customElements.define("fin-calculator", Calculator);
