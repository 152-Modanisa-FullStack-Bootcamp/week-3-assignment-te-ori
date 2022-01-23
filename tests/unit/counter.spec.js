import { mount, shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import { state, getters, mutations, actions, store } from "@/store"
import Counter from "@/Counter"

describe("Counter.vue", () => {
    // 1. Component Exist Check
    // 
    // Burada amacımız Vue'nun istediğimiz componenti render edip etmediğini
    // test etmek. Bu yüzden 
    it("should exist", () => {
        const wrapper = createWithMock()

        expect(wrapper.exists()).toBeTruthy()
    })

    // 2. Increase button exist check
    // 3. Decrease button exist check
    // 7. Increase button functionality check
    it("shold includes ui elements", () => {
        const wrapper = createWithMock()

        expect(wrapper.find('button.decrease').exists()).toBeTruthy()
        expect(wrapper.find('button.increase').exists()).toBeTruthy()
        expect(wrapper.find('span').exists()).toBeTruthy()
    })

    // 4. Increase button functionality check
    it("should call decrease when clicked to decrease button", async () => {
        const wrapper = createWithMock()
        await wrapper.find("button.decrease").trigger("click")

        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("decrement")
    })

    // 5. Increase button functionality check
    it("should call increase when clicked to decrease button", async () => {
        const wrapper = createWithMock()
        await wrapper.find("button.increase").trigger("click")

        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("increment")
    })

    // 6. 2 increase + decrease functionality check together
    it("to click increse and decrease buttons should change count", async () => {
        var localVue = createLocalVue()
        localVue.use(Vuex)

        const store = new Vuex.Store({
            state: { ...state },
            mutations,
            actions
        })

        const wrapper = shallowMount(Counter, {
            localVue,
            store
        })

        const increaseButton = wrapper.find("button.increase")
        const decreaseButton = wrapper.find("button.decrease")

        await increaseButton.trigger("click")
        expect(wrapper.vm.count).toEqual(1)

        await increaseButton.trigger("click")
        expect(wrapper.vm.count).toEqual(2)

        await decreaseButton.trigger("click")
        expect(wrapper.vm.count).toEqual(1)
    })
})

function createWithMock() {
    return shallowMount(Counter,
        {
            mocks: {
                $store: {
                    state: {
                        count: 0
                    },
                    dispatch: jest.fn()
                }
            }
        })
}