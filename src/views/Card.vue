<template>
    <div class="wrapper">
        <div class="card-form">
            <div class="card-list">
                <div class="card-item" v-bind:class="{ '-active': isCardFlipped }">
                    <div class="card-item__side -front">
                        <div class="card-item__focus" v-bind:class="{ '-active': focusElementStyle }"
                            v-bind:style="focusElementStyle" ref="focusElement"></div>
                        <div class="card-item__cover">
                            <img v-bind:src="'https://www.macmillandictionary.com/external/slideshow/full/Green_full.png'"
                                class="card-item__bg">
                        </div>
                        <div class="card-item__wrapper">
                            <div class="card-item__top">
                                <img src="https://speedpay.ng/img/speedpay.png"
                                    class="card-item__chip">
                                <div class="card-item__type">
                                    <transition name="slide-fade-up">
                                        <img v-bind:src="getCardType"
                                            v-if="getCardType" v-bind:key="getCardType" alt="">
                                    </transition>
                                </div>
                            </div>
                            <label for="cardNumber" class="card-item__number" ref="cardNumber">
                                <template v-if="getCardType === 'amex'">
                                    <span v-for="(n, $index) in amexCardMask" v-bind:key="$index">
                                        <transition name="slide-fade-up">
                                            <div class="card-item__numberItem"
                                                v-bind:class="{ '-active': n.trim() === '' }"
                                                v-if="cardNumber.length > $index" key="1">
                                                {{ cardNumber[$index] }}
                                            </div>
                                            <div class="card-item__numberItem"
                                                v-bind:class="{ '-active': n.trim() === '' }" v-else key="2">
                                                {{ n }}
                                            </div>
                                        </transition>
                                    </span>
                                </template>

                                <template v-else>
                                    <span v-for="(n, $index) in otherCardMask" v-bind:key="$index">
                                        <transition name="slide-fade-up">
                                            <div class="card-item__numberItem"
                                                v-bind:class="{ '-active': n.trim() === '' }"
                                                v-if="cardNumber.length > $index" key="1">
                                                {{ cardNumber[$index] }}
                                            </div>
                                            <div class="card-item__numberItem"
                                                v-bind:class="{ '-active': n.trim() === '' }" v-else key="2">
                                                {{ n }}
                                            </div>
                                        </transition>
                                    </span>
                                </template>
                            </label>
                            <div class="card-item__content">
                                <label for="cardName" class="card-item__info" ref="cardName">
                                    <div class="card-item__holder">Card Holder</div>
                                    <transition name="slide-fade-up">
                                        <div class="card-item__name" v-if="cardName.length" key="1">
                                            <transition-group name="slide-fade-right">
                                                <span class="card-item__nameItem"
                                                    v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                                                    :="$index === $index" v-bind:key="$index + 1">{{ n }}</span>
                                            </transition-group>
                                        </div>
                                        <div class="card-item__name" v-else key="2">Full Name</div>
                                    </transition>
                                </label>
                                <div class="card-item__date" ref="cardDate">
                                    <label for="cardMonth" class="card-item__dateTitle">Expires</label>
                                    <label for="cardMonth" class="card-item__dateItem">
                                        <transition name="slide-fade-up">
                                            <span v-if="cardMonth" v-bind:key="cardMonth">{{ cardMonth }}</span>
                                            <span v-else key="2">MM</span>
                                        </transition>
                                    </label>
                                    /
                                    <label for="cardYear" class="card-item__dateItem">
                                        <transition name="slide-fade-up">
                                            <span v-if="cardYear"
                                                v-bind:key="cardYear">{{ String(cardYear).slice(2, 4) }}</span>
                                            <span v-else key="2">YY</span>
                                        </transition>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-item__side -back">
                        <div class="card-item__cover">
                            <img v-bind:src="'https://www.macmillandictionary.com/external/slideshow/full/Green_full.png'"
                                class="card-item__bg">
                        </div>
                        <div class="card-item__band"></div>
                        <div class="card-item__cvv">
                            <div class="card-item__cvvTitle">CVV</div>
                            <div class="card-item__cvvBand">{{ cardCvv }}</div>
                            <div class="card-item__type">
                                <img v-bind:src="''"
                                    v-if="getCardType" class="card-item__typeImg">
                                    <img v-bind:src="'https://www.pngfind.com/pngs/m/471-4717614_visa-logo-png-transparent-visa-card-vector-png.png'"
                                    v-if="getCardType" class="card-item__typeImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-form__inner">
                <div class="card-input">
                    <label for="cardNumber" class="card-input__label">Card Number</label>
                    <input type="text" id="cardNumber" class="card-input__input"
                        v-model="cardNumber" data-ref="cardNumber"
                        autocomplete="off">
                </div>
                <div class="card-input">
                    <label for="cardName" class="card-input__label">Card Holders</label>
                    <input type="text" id="cardName" class="card-input__input" v-model="cardName"
                     data-ref="cardName" autocomplete="off">
                </div>
                <div class="card-form__row">
                    <div class="card-form__col">
                        <div class="card-form__group">
                            <label for="cardMonth" class="card-input__label">Expiration Date</label>
                            <select class="card-input__input -select" id="cardMonth" v-model="cardMonth"
                                  data-ref="cardDate">
                                <option value="" disabled selected>Month</option>
                                <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12"
                                    v-bind:disabled="n < minCardMonth" v-bind:key="n">
                                    {{ n < 10 ? '0' + n : n }} </option>
                            </select>
                            <select class="card-input__input -select" id="cardYear" v-model="cardYear"
                                 data-ref="cardDate">
                                <option value="" disabled selected>Year</option>
                                <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
                                    {{ $index + minCardYear }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="card-form__col -cvv">
                        <div class="card-input">
                            <label for="cardCvv" class="card-input__label">CVV</label>
                            <input type="text" class="card-input__input" id="cardCvv" v-mask="'####'" maxlength="4"
                                v-model="cardCvv" v-on:focus="flipCard(true)" v-on:blur="flipCard(false)"
                                autocomplete="off">
                        </div>
                    </div>
                </div>

                <button class="card-form__button">
                    Submit
                </button>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'CarD',
    data() {
        return {
            currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            minCardYear: new Date().getFullYear(),
            amexCardMask: "#### ###### #####",
            otherCardMask: "#### #### #### ####",
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false
        };
    },
    mounted() {
        this.cardNumberTemp = this.otherCardMask;
        document.getElementById("cardNumber").focus();
    },
    computed: {
        getCardType() {
            let number = this.cardNumber;
            let re = new RegExp("^4");
            if (number.match(re) != null) return "https://www.pngfind.com/pngs/m/471-4717614_visa-logo-png-transparent-visa-card-vector-png.png"; //visa

            re = new RegExp("^(34|37)");
            if (number.match(re) != null) return "amex";

            re = new RegExp("^5[1-5]");
            if (number.match(re) != null) return "https://toppng.com//public/uploads/preview/mastercard-logo-11530966761nhfzlt6qu8.png"; //master card

            re = new RegExp("^6011");
            if (number.match(re) != null) return "discover";

            return "https://thumbs.dreamstime.com/b/unknown-credit-card-isolated-white-background-unknown-credit-card-icon-116901050.jpg"; // default type master card
        },
        minCardMonth() {
            if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
            return 1;
        }
    },
    watch: {
        cardYear() {
            if (this.cardMonth < this.minCardMonth) {
                this.cardMonth = "";
            }
        }
    },
    methods: {
        flipCard(status) {
            this.isCardFlipped = status;
        },
        
       
    }
}
</script>

<style>
@import '../../public/css/card.css';
</style>