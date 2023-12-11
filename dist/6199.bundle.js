"use strict";(self.webpackChunkreact_hello_webapp=self.webpackChunkreact_hello_webapp||[]).push([[6199],{60561:(t,r,e)=>{e.d(r,{S:()=>s});var a=e(31007),n=e(3332);class s{get chainId(){return this._chainId}constructor(t,r,e){this.contractWrapper=t,this.storage=r,this.erc1155=new n.e(this.contractWrapper,this.storage,e),this._chainId=e}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async get(t){return this.erc1155.get(t)}async totalSupply(t){return this.erc1155.totalSupply(t)}async balanceOf(t,r){return this.erc1155.balanceOf(t,r)}async balance(t){return this.erc1155.balance(t)}async isApproved(t,r){return this.erc1155.isApproved(t,r)}transfer=(0,a.c)((()=>{var t=this;return async function(r,e,a){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[0];return t.erc1155.transfer.prepare(r,e,a,n)}})());setApprovalForAll=(0,a.c)((async(t,r)=>this.erc1155.setApprovalForAll.prepare(t,r)));airdrop=(0,a.c)((()=>{var t=this;return async function(r,e,a){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[0];return t.erc1155.airdrop.prepare(r,e,a,n)}})())}},85330:(t,r,e)=>{e.d(r,{h:()=>n});var a=e(52367);async function n(t,r,n){const s=t.getProvider(),o=(await Promise.resolve().then(e.t.bind(e,49242,19))).default,c=new a.cu(s,r,o,{},t.storage),i=await t.getSignerAddress(),d=t.address;return(await c.read("allowance",[i,d])).gte(n)}},3273:(t,r,e)=>{e.d(r,{a:()=>l,g:()=>w,h:()=>p,i:()=>d,m:()=>h,v:()=>u});var a=e(20787),n=e(74054),s=e(35179),o=e(72914),c=e(52367),i=e(4254);async function d(t,r,n,s,c){try{const i=(await e.e(5025).then(e.t.bind(e,25025,19))).default,d=new a.CH(n,i,t),[p,u]=await Promise.all([d.supportsInterface(o.I),d.supportsInterface(o.a)]);if(p){const o=(await Promise.resolve().then(e.t.bind(e,70332,19))).default,i=new a.CH(n,o,t);if(await i.isApprovedForAll(c,r))return!0;let d;try{d=await i.getApproved(s)}catch(t){}return d?.toLowerCase()===r.toLowerCase()}if(u){const s=(await Promise.resolve().then(e.t.bind(e,8455,19))).default,o=new a.CH(n,s,t);return await o.isApprovedForAll(c,r)}return console.error("Contract does not implement ERC 1155 or ERC 721."),!1}catch(t){return console.error("Failed to check if token is approved",t),!1}}async function p(t,r,a,n,s){const i=(await e.e(5025).then(e.t.bind(e,25025,19))).default,d=new c.cu(t.getSignerOrProvider(),a,i,t.options,t.storage),[p,u]=await Promise.all([d.read("supportsInterface",[o.I]),d.read("supportsInterface",[o.a])]);if(p){const o=(await Promise.resolve().then(e.t.bind(e,70332,19))).default,i=new c.cu(t.getSignerOrProvider(),a,o,t.options,t.storage);if(!await i.read("isApprovedForAll",[s,r])){(await i.read("getApproved",[n])).toLowerCase()===r.toLowerCase()||await i.sendTransaction("setApprovalForAll",[r,!0])}}else{if(!u)throw Error("Contract must implement ERC 1155 or ERC 721.");{const n=(await Promise.resolve().then(e.t.bind(e,8455,19))).default,o=new c.cu(t.getSignerOrProvider(),a,n,t.options,t.storage);await o.read("isApprovedForAll",[s,r])||await o.sendTransaction("setApprovalForAll",[r,!0])}}}function u(t){if((0,s.Z)(void 0!==t.assetContractAddress&&null!==t.assetContractAddress,"Asset contract address is required"),(0,s.Z)(void 0!==t.buyoutPricePerToken&&null!==t.buyoutPricePerToken,"Buyout price is required"),(0,s.Z)(void 0!==t.listingDurationInSeconds&&null!==t.listingDurationInSeconds,"Listing duration is required"),(0,s.Z)(void 0!==t.startTimestamp&&null!==t.startTimestamp,"Start time is required"),(0,s.Z)(void 0!==t.tokenId&&null!==t.tokenId,"Token ID is required"),(0,s.Z)(void 0!==t.quantity&&null!==t.quantity,"Quantity is required"),"NewAuctionListing"===t.type)(0,s.Z)(void 0!==t.reservePricePerToken&&null!==t.reservePricePerToken,"Reserve price is required")}async function h(t,r,e){return{quantity:e.quantityDesired,pricePerToken:e.pricePerToken,currencyContractAddress:e.currency,buyerAddress:e.offeror,quantityDesired:e.quantityWanted,currencyValue:await(0,i.a)(t,e.currency,e.quantityWanted.mul(e.pricePerToken)),listingId:r}}function l(t,r,e){if(e=n.O$.from(e),t=n.O$.from(t),r=n.O$.from(r),t.eq(n.O$.from(0)))return!1;return r.sub(t).mul(c.dy).div(t).gte(e)}async function w(t,r,e){const a=[];for(;r-t>o.D;)a.push(e(t,t+o.D-1)),t+=o.D;return a.push(e(t,r-1)),await Promise.all(a)}},6199:(t,r,e)=>{e.r(r),e.d(r,{Pack:()=>F});var a=e(74054),n=e(80589),s=e(85472),o=e(4254),c=e(85330),i=e(61080),d=e(52367),p=e(587),u=e(31406),h=e(3273),l=e(72914),w=e(31007),g=e(12428),f=e(65444),k=e(83475),v=e(60561),m=e(27761),y=e(43508),A=e(75640),P=e(1604);const W=(()=>P.z.object({contractAddress:d.bd}))(),C=(()=>W.extend({quantity:d.cz}))(),R=(()=>W.extend({tokenId:d.ba}))(),I=(()=>W.extend({tokenId:d.ba,quantity:d.ba}))(),b=(()=>C.omit({quantity:!0}).extend({quantityPerReward:d.cz}))(),O=R,S=(()=>I.omit({quantity:!0}).extend({quantityPerReward:d.ba}))(),T=(()=>b.extend({totalRewards:d.ba.default("1")}))(),q=O,$=(()=>S.extend({totalRewards:d.ba.default("1")}))(),L=(()=>P.z.object({erc20Rewards:P.z.array(T).default([]),erc721Rewards:P.z.array(q).default([]),erc1155Rewards:P.z.array($).default([])}))(),E=(()=>L.extend({packMetadata:A.N,rewardsPerPack:d.ba.default("1"),openStartTime:p.R.default(new Date)}))();e(41829),e(72993),e(71770),e(86955);class U{featureName=d.dD.name;constructor(t,r,e,a,n){let s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:new d.cu(t,r,m,a,e);this.contractWrapper=s,this.storage=e,this.chainId=n,this.events=new u.a(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}open=(0,w.c)((()=>{var t=this;return async function(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e5;return w.T.fromContractWrapper({contractWrapper:t.contractWrapper,method:"openPack",args:[r,e],overrides:{gasLimit:n},parse:r=>{let e=a.O$.from(0);try{e=t.contractWrapper.parseLogs("PackOpenRequested",r?.logs)[0].args.requestId}catch(t){}return{receipt:r,id:e}}})}})());claimRewards=(0,w.c)((()=>{var t=this;return async function(){let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5e5;return w.T.fromContractWrapper({contractWrapper:t.contractWrapper,method:"claimRewards",args:[],overrides:{gasLimit:r},parse:async r=>{const e=t.contractWrapper.parseLogs("PackOpened",r?.logs);if(0===e.length)throw new Error("PackOpened event not found");const a=e[0].args.rewardUnitsDistributed;return await t.parseRewards(a)}})}})());async parseRewards(t){const r=[],e=[],a=[];for(const s of t)switch(s.tokenType){case 0:{const t=await(0,o.f)(this.contractWrapper.getProvider(),s.assetContract);r.push({contractAddress:s.assetContract,quantityPerReward:n.formatUnits(s.totalAmount,t.decimals).toString()});break}case 1:e.push({contractAddress:s.assetContract,tokenId:s.tokenId.toString()});break;case 2:a.push({contractAddress:s.assetContract,tokenId:s.tokenId.toString(),quantityPerReward:s.totalAmount.toString()})}return{erc20Rewards:r,erc721Rewards:e,erc1155Rewards:a}}async addPackOpenEventListener(t){return this.events.addEventListener("PackOpened",(async r=>{t(r.data.packId.toString(),r.data.opener,await this.parseRewards(r.data.rewardUnitsDistributed))}))}async canClaimRewards(t){const r=await(0,d.aP)(t||await this.contractWrapper.getSignerAddress());return await this.contractWrapper.read("canClaimRewards",[r])}async openAndClaim(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e5;const n=await this.contractWrapper.sendTransaction("openPackAndClaimRewards",[t,r,e],{gasLimit:a.O$.from(5e5)});let s=a.O$.from(0);try{s=this.contractWrapper.parseLogs("PackOpenRequested",n?.logs)[0].args.requestId}catch(t){}return{receipt:n,id:s}}async getLinkBalance(){const t=(await Promise.resolve().then(e.t.bind(e,49242,19))).default;return this.getLinkContract(t).balanceOf(this.contractWrapper.address)}async transferLink(t){const r=(await Promise.resolve().then(e.t.bind(e,49242,19))).default;await this.getLinkContract(r).transfer(this.contractWrapper.address,t)}getLinkContract(t){const r=d.b0[this.chainId];if(!r)throw new Error(`No LINK token address found for chainId ${this.chainId}`);const e=new d.cu(this.contractWrapper.getSignerOrProvider(),r,t,this.contractWrapper.options,this.storage);return new y.f(e,this.storage,this.chainId)}}class F extends v.S{static contractRoles=d.dE;get vrf(){return(0,p.a)(this._vrf,d.dD)}constructor(t,r,e){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=arguments.length>4?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0;super(arguments.length>6&&void 0!==arguments[6]?arguments[6]:new d.cu(t,r,n,a.gasless&&"openzeppelin"in a.gasless?{...a,gasless:{...a.gasless,openzeppelin:{...a.gasless.openzeppelin,useEOAForwarder:!0}}}:a,e),e,s),this.abi=d.bn.parse(n||[]),this.metadata=new u.C(this.contractWrapper,d.c5,this.storage),this.app=new u.b(this.contractWrapper,this.metadata,this.storage),this.roles=new k.C(this.contractWrapper,F.contractRoles),this.royalties=new f.C(this.contractWrapper,this.metadata),this.encoder=new o.C(this.contractWrapper),this.estimator=new u.G(this.contractWrapper),this.events=new u.a(this.contractWrapper),this.interceptor=new g.C(this.contractWrapper),this.owner=new f.a(this.contractWrapper),this._vrf=this.detectVrf()}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t),this._vrf?.onNetworkUpdated(t)}getAddress(){return this.contractWrapper.address}async get(t){return this.erc1155.get(t)}async getAll(t){return this.erc1155.getAll(t)}async getOwned(t){return this.erc1155.getOwned(t)}async getTotalCount(){return this.erc1155.totalCount()}async isTransferRestricted(){return!await this.contractWrapper.read("hasRole",[(0,d.H)("transfer"),s.d])}async getPackContents(t){const{contents:r,perUnitAmounts:e}=await this.contractWrapper.read("getPackContents",[t]),s=[],c=[],i=[];for(let t=0;t<r.length;t++){const d=r[t],p=e[t];switch(d.tokenType){case 0:{const t=await(0,o.f)(this.contractWrapper.getProvider(),d.assetContract),r=n.formatUnits(p,t.decimals),e=n.formatUnits(a.O$.from(d.totalAmount).div(p),t.decimals);s.push({contractAddress:d.assetContract,quantityPerReward:r,totalRewards:e});break}case 1:c.push({contractAddress:d.assetContract,tokenId:d.tokenId.toString()});break;case 2:i.push({contractAddress:d.assetContract,tokenId:d.tokenId.toString(),quantityPerReward:p.toString(),totalRewards:a.O$.from(d.totalAmount).div(p).toString()})}}return{erc20Rewards:s,erc721Rewards:c,erc1155Rewards:i}}create=(0,w.c)((async t=>{const r=await this.contractWrapper.getSignerAddress();return this.createTo.prepare(r,t)}));addPackContents=(0,w.c)((async(t,r)=>{const[e,a]=await Promise.all([this.contractWrapper.getSignerAddress(),L.parseAsync(r)]),{contents:n,numOfRewardUnits:s}=await this.toPackContentArgs(a);return w.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"addPackContents",args:[t,n,s,e],parse:t=>{const r=this.contractWrapper.parseLogs("PackUpdated",t?.logs);if(0===r.length)throw new Error("PackUpdated event not found");const e=r[0].args.packId;return{id:e,receipt:t,data:()=>this.erc1155.get(e)}}})}));createTo=(0,w.c)((async(t,r)=>{const[e,a,n]=await Promise.all([(0,l.b)(r.packMetadata,this.storage),E.parseAsync(r),(0,d.aP)(t)]),{erc20Rewards:s,erc721Rewards:o,erc1155Rewards:c}=a,i={erc20Rewards:s,erc721Rewards:o,erc1155Rewards:c},{contents:p,numOfRewardUnits:u}=await this.toPackContentArgs(i);return w.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createPack",args:[p,u,e,a.openStartTime,a.rewardsPerPack,n],parse:t=>{const r=this.contractWrapper.parseLogs("PackCreated",t?.logs);if(0===r.length)throw new Error("PackCreated event not found");const e=r[0].args.packId;return{id:e,receipt:t,data:()=>this.erc1155.get(e)}}})}));open=(0,w.c)((()=>{var t=this;return async function(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e5;if(t._vrf)throw new Error("This contract is using Chainlink VRF, use `contract.vrf.open()` or `contract.vrf.openAndClaim()` instead");return w.T.fromContractWrapper({contractWrapper:t.contractWrapper,method:"openPack",args:[r,e],overrides:{gasLimit:a},parse:async r=>{const e=t.contractWrapper.parseLogs("PackOpened",r?.logs);if(0===e.length)throw new Error("PackOpened event not found");const a=e[0].args.rewardUnitsDistributed,s=[],c=[],i=[];for(const r of a)switch(r.tokenType){case 0:{const e=await(0,o.f)(t.contractWrapper.getProvider(),r.assetContract);s.push({contractAddress:r.assetContract,quantityPerReward:n.formatUnits(r.totalAmount,e.decimals).toString()});break}case 1:c.push({contractAddress:r.assetContract,tokenId:r.tokenId.toString()});break;case 2:i.push({contractAddress:r.assetContract,tokenId:r.tokenId.toString(),quantityPerReward:r.totalAmount.toString()})}return{erc20Rewards:s,erc721Rewards:c,erc1155Rewards:i}}})}})());async toPackContentArgs(t){const r=[],e=[],{erc20Rewards:n,erc721Rewards:s,erc1155Rewards:o}=t,d=this.contractWrapper.getProvider(),p=await this.contractWrapper.getSignerAddress();for(const t of n){const a=(await(0,i.n)(d,t.quantityPerReward,t.contractAddress)).mul(t.totalRewards);if(!await(0,c.h)(this.contractWrapper,t.contractAddress,a))throw new Error(`ERC20 token with contract address "${t.contractAddress}" does not have enough allowance to transfer.\n\nYou can set allowance to the multiwrap contract to transfer these tokens by running:\n\nawait sdk.getToken("${t.contractAddress}").setAllowance("${this.getAddress()}", ${a});\n\n`);e.push(t.totalRewards),r.push({assetContract:t.contractAddress,tokenType:0,totalAmount:a,tokenId:0})}for(const t of s){if(!await(0,h.i)(this.contractWrapper.getProvider(),this.getAddress(),t.contractAddress,t.tokenId,p))throw new Error(`ERC721 token "${t.tokenId}" with contract address "${t.contractAddress}" is not approved for transfer.\n\nYou can give approval the multiwrap contract to transfer this token by running:\n\nawait sdk.getNFTCollection("${t.contractAddress}").setApprovalForToken("${this.getAddress()}", ${t.tokenId});\n\n`);e.push("1"),r.push({assetContract:t.contractAddress,tokenType:1,totalAmount:1,tokenId:t.tokenId})}for(const t of o){if(!await(0,h.i)(this.contractWrapper.getProvider(),this.getAddress(),t.contractAddress,t.tokenId,p))throw new Error(`ERC1155 token "${t.tokenId}" with contract address "${t.contractAddress}" is not approved for transfer.\n\nYou can give approval the multiwrap contract to transfer this token by running:\n\nawait sdk.getEdition("${t.contractAddress}").setApprovalForAll("${this.getAddress()}", true);\n\n`);e.push(t.totalRewards),r.push({assetContract:t.contractAddress,tokenType:2,totalAmount:a.O$.from(t.quantityPerReward).mul(a.O$.from(t.totalRewards)),tokenId:t.tokenId})}return{contents:r,numOfRewardUnits:e}}async prepare(t,r,e){return w.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}detectVrf(){if((0,u.d)(this.contractWrapper,"PackVRF"))return new U(this.contractWrapper.getSignerOrProvider(),this.contractWrapper.address,this.storage,this.contractWrapper.options,this.chainId)}}}}]);