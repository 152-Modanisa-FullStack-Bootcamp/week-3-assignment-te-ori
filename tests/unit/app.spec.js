import { mount, shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import store from "@/store"
import App from "@/App"

describe("App.vue", () => {
    it("should exists and contains h1", () => {
        const wrapper = getAppComponenetWithCaseCount(0)

        expect(wrapper.exists()).toBeTruthy()
        const h1 = wrapper.find("h1")
        expect(h1.exists()).toBeTruthy()
        expect(h1.text()).toMatch("Daily Corona Cases in Turkey")
    })

    it("should display 'safe' message when case count less than 5", () => {
        const caseCount = 4
        const message = `So safe. Case count is ${caseCount}k`
        const cssClass = "safe"
        testByCaseCount(caseCount, { message, cssClass })
    })

    it("should display 'normal' message when case count between 5 and 10", () => {
        const caseCount = 7
        const message = `Life is normal. Case count is ${caseCount}k`
        const cssClass = "normal"
        testByCaseCount(caseCount, { message, cssClass })
    })

    it("should display 'danger' message when case count greater than 10", () => {
        const caseCount = 11
        const message = `Danger!!! Case count is ${caseCount}k`
        const cssClass = "danger"
        testByCaseCount(caseCount, { message, cssClass })
    })
})

function testByCaseCount(caseCount, expectes) {
    const wrapper = getAppComponenetWithCaseCount(caseCount)
    const messageArea = wrapper.find(".notificationArea")

    expect(messageArea.exists()).toBeTruthy()
    expect(messageArea.classes()).toContain(expectes.cssClass)
}

function getAppComponenetWithCaseCount(caseCount) {
    return shallowMount(App, {
        mocks: {
            $store: {
                state: {
                    count: caseCount
                },
                getters: {
                    getCount: caseCount
                }
            }
        }
    })
}