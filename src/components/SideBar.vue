<template>
    <aside class="sidebar">
        <nav>
            <button @click="$router.push('/customer/'); CustomerClick()">
                <span :class="{ active: active1 }">
                    <i class="bi bi-person-vcard-fill"></i> <span>Customer</span>
                </span>
            </button>
            <button @click="$router.push('/account/'); AccountClick()">
                <span :class="{ active: active2 }">
                    <i class="bi bi-wallet2"></i> <span>Account</span>
                </span>
            </button>
            <button @click="$router.push('/deposit/'); DepositClick()">
                <span :class="{ active: active3 }">
                    <i class="bi bi-folder-plus"></i> <span>Deposit</span>
                </span>
            </button>
            <button @click="$router.push('/withdrawal/'); WithdrawClick()">
                <span :class="{ active: active4 }">
                    <i class="bi bi-folder-minus"></i> <span>Withdraw</span>
                </span>
            </button>
            <button @click="$router.push('/card/'); CardClick()">
                <span :class="{ active: active5 }">
                    <i class="bi bi-credit-card-2-back-fill"></i> <span>Card</span>
                </span>
            </button>
            <button @click="$router.push('/transfer/'); TransferClick()">
                <span :class="{ active: active6 }">
                    <i class="bi bi-send-fill"></i> <span>Transfer</span>
                </span>
            </button>
            <button @click="$router.push('/'); LoginClick()" v-if="status!==200">
                <span :class="{ active: active7 }">
                    <i class="bi bi-box-arrow-in-right"></i> <span>Login</span>
                </span>
            </button>
            <button @click="$router.push('#'); LogoutClick()" v-if="status===200">
                <span :class="{ active: active8 }">
                    <i class="bi bi-box-arrow-left"></i> <span>Logout</span>
                </span>
            </button>
        </nav>
    </aside>
</template>
  
<script>
import { mapState } from "vuex";
export default {
    name: 'SideBar',
    computed:{
        ...mapState('auth',{
            status: (state) => state.status,
        }),
    },
    data() {
        return {
            active1: false,
            active2: false,
            active3: false,
            active4: false,
            active5: false,
            active6: false,
            active7: false,
            active8: false,
        }
    },
    methods: {
        CustomerClick() {
            this.active1 = true;
            this.active2 = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.active7 = false;
            this.active8 = false;
        },
        AccountClick() {
            this.active1 = false;
            this.active2 = true;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.active7 = false;
            this.active8 = false;
        },
        DepositClick() {
            this.active1 = false;
            this.active2 = false;
            this.active3 = true;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.active7 = false;
            this.active8 = false;
        },
        WithdrawClick() {
            this.active1 = false;
            this.active2 = false;
            this.active3 = false;
            this.active4 = true;
            this.active5 = false;
            this.active6 = false;
            this.active7 = false;
            this.active8 = false;
        },
        CardClick() {
            this.active1 = false;
            this.active2 = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = true;
            this.active6 = false;
            this.active7 = false;
            this.active8 = false;
        },
        TransferClick() {
            this.active1 = false;
            this.active2 = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = true;
            this.active7 = false;
            this.active8 = false;
        },
        LoginClick() {
            this.active1 = false;
            this.active2 = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.active7 = true;
            this.active8 = false;
        },
        LogoutClick() {
            this.active1 = false;
            this.active2 = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.active7 = false;
            this.active8 = true;
            window.location.reload();
        },
    },
}
</script>
  
<style scoped>
.sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 200px;
    height: calc(100% - 60px);
    border-right: 1px solid #dbdbdb;
    transition: 0.35;
    background: #1c194c;
    z-index: 3;
}

.sidebar button {
    height: 60px;
    background: transparent;
    border: 0;
    padding: 0;
    font-family: inherit;
    color: inherit;
    cursor: pointer;
}

/* styles.css */
.sidebar button>span {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 48px;
    width: 100%;
    padding: 0 12px;
    line-height: 1;
}

.sidebar button:hover>span {
    background: #f2f2f2;
}

.sidebar button:hover>span i {
    color: black;
}

.sidebar button>.active {
    background: #e8bebe;
}

.sidebar button:hover>span :is(i, img) {
    scale: 1.05;
}

.sidebar button>span>span {
    transition: 0.35;
    color: rgb(94, 126, 214);
}

/* styles.css */
.sidebar button i {
    position: relative;
    font-size: 28px;
    transition: 0.2s;
    color: green;
}

.sidebar button img {
    width: 28px;
    height: 28px;
    transition: 0.25;
}

.sidebar button i>span {
    display: grid;
    place-items: center;
    height: 20px;
    padding: 0 4px;
    border-radius: 10px;
    position: absolute;
    top: -5px;
    right: -10px;
    border: 1px solid #ffffff;
    background: #ff2f40;
    color: #f9f9f9;
    font-size: 12px;
    font-family: BlinkMacSystemFont;
    font-style: normal;
}

.sidebar button i>em {
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    position: absolute;
    top: 2px;
    right: -1px;
    border: 1px solid #ffffff;
    background: #ff2f40;
    color: #f9f9f9;
    font-size: 12px;
    font-family: BlinkMacSystemFont;
    font-style: normal;
}

.sidebar button span {
    font-size: 17px;
}

.sidebar>nav {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.sidebar>nav button:last-child {
    margin-top: auto;
}

@media (max-width:1000px) {
    .logo-img {
        display: none;
    }

    .logo-icon {
        display: block;
    }

    .sidebar {
        width: 13%;
    }

    .sidebar button>span {
        width: 100%;
    }

    .sidebar button>span>span {
        opacity: 0;
        visibility: hidden;
    }
}
</style>
  