import { ComponentTestHelper } from "component-test-helper"

export class CountButtonTestHelper extends ComponentTestHelper{

    constructor(){
        super(builder => builder.byTestId('count-button'))
    }

    async countByOne(){
        await this.click()
    }

    async countByTwo(){
        await this.click()
        await this.click()
    }

    async expectToIncrementByOne(){
        const initialValue = parseInt((await this.get()).textContent)
        await this.countByOne()
        const newValue = parseInt((await this.get()).textContent)
        expect(newValue).toBe(initialValue + 1)
    }

    async expectToIncrementByTwo(){
        const initialValue = parseInt((await this.get()).textContent)
        await this.countByTwo()
        const newValue = parseInt((await this.get()).textContent)
        expect(newValue).toBe(initialValue + 2)
    }
}