// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { expect } from "chai";
import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
	beforeEach(() => {
		global.XMLHttpRequest = () => ({
			open: () => {
				// Method open
			},
			onload: () => {
				// onload
			},
			send: function() {
				this.onload();
			},
			withCredentials: false,
			setRequestHeader: () => {
				// Method setRequestHeader
			},
			abort: () => {
				// Abort
			},
			status: 200,
			response: JSON.stringify('hello')
		});
	});


	it("Check 'get' method", async () => {
		const HTTPTransportEntity = new HTTPTransport();
		
		const getUrl = '/getUrl';
		const {status, response} = await HTTPTransportEntity.get(getUrl);
		expect(status).to.eq(200);
		expect(response).to.eq('hello');
	});

	it("Check 'get' not throw error if data JSON", async () => {
		const data = {test: 'hello'};
		global.XMLHttpRequest = () => ({
			open: () => {
				// Method open
			},
			onload: () => {
				// onload
			},
			send: function() {
				this.onload();
			},
			withCredentials: false,
			setRequestHeader: () => {
				// Method setRequestHeader
			},
			abort: () => {
				// Abort
			},
			status: 200,
			response: data
		});
		const HTTPTransportEntity = new HTTPTransport();
		const {status, response} = await HTTPTransportEntity.get('');
		expect(status).to.eq(200);
		expect(response).to.eq(data);
	})

	it('Timeout with error and status === 0', async () => {
		global.XMLHttpRequest = () => ({
			open: () => {
				// Method open
			},
			onload: () => {
				// onload
			},
			send: function() {
				this.ontimeout();
			},
			withCredentials: false,
			setRequestHeader: () => {
				// Method setRequestHeader
			},
			abort: () => {
				// Abort
			}
		});
		const HTTPTransportEntity = new HTTPTransport();

		try {
			await HTTPTransportEntity.get('')
		} catch ({status}) {
			expect(status).to.eq(0);
		}
	});
})
