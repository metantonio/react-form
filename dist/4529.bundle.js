"use strict";(self.webpackChunkreact_hello_webapp=self.webpackChunkreact_hello_webapp||[]).push([[4529],{73240:(e,t,s)=>{s.d(t,{W:()=>i});var n=s(97389),r=s(65007);class i extends r.Z{constructor(e){let{chains:t=n.gL9,options:s}=e;super(),this.chains=t,this.options=s}getBlockExplorerUrls(e){const t=e.explorers?.map((e=>e.url))??[];return t.length>0?t:void 0}isChainUnsupported(e){return!this.chains.some((t=>t.chainId===e))}updateChains(e){this.chains=e}}},72683:(e,t,s)=>{s.d(t,{A:()=>o,C:()=>c,R:()=>h,S:()=>d,U:()=>u,a:()=>a});var n=s(13389);class r extends Error{constructor(e,t){const{cause:s,code:n,data:r}=t;if(!Number.isInteger(n))throw new Error('"code" must be an integer.');if(!e||"string"!=typeof e)throw new Error('"message" must be a nonempty string.');super(`${e}. Cause: ${JSON.stringify(s)}`),this.cause=s,this.code=n,this.data=r}}class i extends r{constructor(e,t){const{cause:s,code:n,data:r}=t;if(!(Number.isInteger(n)&&n>=1e3&&n<=4999))throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');super(e,{cause:s,code:n,data:r})}}class o extends Error{constructor(){super(...arguments),(0,n._)(this,"name","AddChainError"),(0,n._)(this,"message","Error adding chain")}}class c extends Error{constructor(e){let{chainId:t,connectorId:s}=e;super(`Chain "${t}" not configured for connector "${s}".`),(0,n._)(this,"name","ChainNotConfigured")}}class a extends Error{constructor(){super(...arguments),(0,n._)(this,"name","ConnectorNotFoundError"),(0,n._)(this,"message","Connector not found")}}class h extends r{constructor(e){super("Resource unavailable",{cause:e,code:-32002}),(0,n._)(this,"name","ResourceUnavailable")}}class d extends i{constructor(e){super("Error switching chain",{cause:e,code:4902}),(0,n._)(this,"name","SwitchChainError")}}class u extends i{constructor(e){super("User rejected request",{cause:e,code:4001}),(0,n._)(this,"name","UserRejectedRequestError")}}},12629:(e,t,s)=>{function n(e){return"string"==typeof e?Number.parseInt(e,"0x"===e.trim().substring(0,2)?16:10):"bigint"==typeof e?Number(e):e}s.d(t,{n:()=>n})},65070:(e,t,s)=>{s.d(t,{g:()=>i,i:()=>r});var n=s(97389);function r(e){const t=new URL(e).hostname;return t.endsWith(".thirdweb.com")||"localhost"===t||"0.0.0.0"===t}function i(e){return(0,n.OZ$)(e).map((e=>{try{const t=new URL(e);return t.hostname.endsWith(".thirdweb.com")&&(t.pathname="",t.search=""),t.toString()}catch(t){return e}}))}},74529:(e,t,s)=>{s.d(t,{FrameConnector:()=>w});var n=s(42493),r=s(13389),i=s(62914),o=s(98455),c=s(5716),a=s(73240),h=s(72683),d=s(65070),u=s(12629),m=(s(65007),new WeakMap);class w extends a.W{constructor(e){let{chains:t,options:s,connectorStorage:o}=e;super({chains:t,options:{shimDisconnect:!0,...s}}),(0,r._)(this,"id","frame"),(0,r._)(this,"name","Frame"),(0,r._)(this,"ready",!0),(0,r._)(this,"shimDisconnectKey",`${this.id}.shimDisconnect`),(0,n._)(this,m,{writable:!0,value:void 0}),(0,r._)(this,"onAccountsChanged",(e=>{0===e.length?this.emit("disconnect"):this.emit("change",{account:i.getAddress(e[0])})})),(0,r._)(this,"onChainChanged",(e=>{const t=(0,u.n)(e),s=this.isChainUnsupported(t);this.emit("change",{chain:{id:t,unsupported:s}})})),(0,r._)(this,"onDisconnect",(()=>{this.emit("disconnect"),this.options.shimDisconnect&&this.connectorStorage.removeItem(this.shimDisconnectKey)})),this.connectorStorage=o}async connect(e){try{const t=await this.getProvider();if(!t)throw new h.a;this.setupListeners(),this.emit("message",{type:"connecting"});const s=await t.request({method:"eth_requestAccounts"}),n=i.getAddress(s[0]);let r=await this.getChainId(),o=this.isChainUnsupported(r);if(e?.chainId&&r!==e?.chainId){r=(await this.switchChain(e?.chainId)).chainId,o=this.isChainUnsupported(r)}return this.options.shimDisconnect&&this.connectorStorage.setItem(this.shimDisconnectKey,"true"),{account:n,provider:t,chain:{id:r,unsupported:o}}}catch(e){if(this.isUserRejectedRequestError(e))throw new h.U(e);if(-32002===e.code)throw new h.R(e);throw e}}async disconnect(){const e=await this.getProvider();e?.removeListener&&(e.removeListener("accountsChanged",this.onAccountsChanged),e.removeListener("chainChanged",this.onChainChanged),e.removeListener("disconnect",this.onDisconnect),this.isInjected()||e.close(),this.options.shimDisconnect&&this.connectorStorage.removeItem(this.shimDisconnectKey))}async getAccount(){const e=await this.getProvider();if(!e)throw new h.a;const t=await e.request({method:"eth_accounts"});return i.getAddress(t[0])}async getChainId(){const e=await this.getProvider();if(!e)throw new h.a;const t=await e.request({method:"eth_chainId"});return(0,u.n)(t)}async getProvider(){return(0,n.a)(this,m,this.isInjected()?this.injectedProvider():await this.createProvider()),(0,n.b)(this,m)}async getSigner(){let{chainId:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const[t,s]=await Promise.all([this.getProvider(),this.getAccount()]);return new o.Q(t,e).getSigner(s)}async isAuthorized(){try{if(this.options.shimDisconnect&&!this.connectorStorage.getItem(this.shimDisconnectKey))return!1;if(!await this.getProvider())throw new h.a;return!!await this.getAccount()}catch{return!1}}async switchChain(e){const t=await this.getProvider();if(!t)throw new h.a;const s=c.hexValue(e);try{return await Promise.all([t.request({method:"wallet_switchEthereumChain",params:[{chainId:s}]}),new Promise((t=>this.on("change",(s=>{let{chain:n}=s;n?.id===e&&t()}))))]),this.chains.find((t=>t.chainId===e))??{chainId:e,name:`Chain ${s}`,slug:`${s}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpc:[""],chain:"",shortName:"",testnet:!0}}catch(n){const r=this.chains.find((t=>t.chainId===e));if(!r)throw new h.C({chainId:e,connectorId:this.id});if(4902===n.code)try{await t.request({method:"wallet_addEthereumChain",params:[{chainId:s,chainName:r.name,nativeCurrency:r.nativeCurrency,rpcUrls:(0,d.g)(r),blockExplorerUrls:this.getBlockExplorerUrls(r)}]});if(await this.getChainId()!==e)throw new h.U(new Error("User rejected switch after adding network."));return r}catch(e){if(this.isUserRejectedRequestError(e))throw new h.U(e);throw new h.A(e.message)}if(this.isUserRejectedRequestError(n))throw new h.U(n);throw new h.S(n)}}async watchAsset(e){let{address:t,decimals:s=18,image:n,symbol:r}=e;const i=await this.getProvider();if(!i)throw new h.a;return i.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:t,decimals:s,image:n,symbol:r}}})}async setupListeners(){const e=await this.getProvider();e.on&&(e.on("accountsChanged",this.onAccountsChanged),e.on("chainChanged",this.onChainChanged),e.on("disconnect",this.onDisconnect))}isUserRejectedRequestError(e){return 4001===e.code}injectedProvider(){return window?.ethereum}isInjected(){return!!this.injectedProvider()?.isFrame}async createProvider(){return(0,(await s.e(8499).then(s.t.bind(s,58499,23))).default)("frame")}}}}]);