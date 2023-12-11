"use strict";(self.webpackChunkreact_hello_webapp=self.webpackChunkreact_hello_webapp||[]).push([[5409],{75409:(t,r,a)=>{a.d(r,{h:()=>$,i:()=>z});var e=a(60941),n=a(74054),i=a(85472),s=a(7858),c=a(52496),o=a(80589),p=a(72914),d=a(52367),h=a(587),l=a(31406),u=a(31007),m=a(27827),g=a(65444),y=a(4254),W=a(25019),w=a(75640),T=a(35179),f=a(61080),C=a(1604),b=a(31098);class k{featureName=d.cM.name;constructor(t,r,a){this.erc721=t,this.contractWrapper=r,this.storage=a}to=(0,u.c)((async(t,r)=>{const[a,e]=await Promise.all([(0,p.u)(r,this.storage),(0,d.aP)(t)]),n=new y.C(this.contractWrapper),i=a.map((t=>n.encode("mintTo",[e,t])));return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[i],parse:t=>{const a=this.contractWrapper.parseLogs("TokensMinted",t.logs);if(0===a.length||a.length<r.length)throw new Error("TokenMinted event not found, minting failed");return a.map((r=>{const a=r.args.tokenIdMinted;return{id:a,receipt:t,data:()=>this.erc721.get(a)}}))}})}))}class S{featureName=d.cN.name;constructor(t,r,a){this.erc721=t,this.contractWrapper=r,this.storage=a;const e=new l.C(this.contractWrapper,d.bk,this.storage);this.conditions=new m.D(this.contractWrapper,e,this.storage)}to=(0,u.c)((async(t,r,a)=>{const e=await this.conditions.getClaimTransaction(t,r,a);return e.setParse((t=>{const a=this.contractWrapper.parseLogs("TokensClaimed",t?.logs)[0].args.startTokenId,e=a.add(r),n=[];for(let r=a;r.lt(e);r=r.add(1))n.push({id:r,receipt:t,data:()=>this.erc721.get(r)});return n})),e}))}class P{featureName=d.cO.name;constructor(t,r){this.erc721=t,this.contractWrapper=r}async getClaimTransaction(t,r,a){let e={};return a&&a.pricePerToken&&(e=await(0,g.c)(this.contractWrapper,a.pricePerToken,r,a.currencyAddress,a.checkERC20Allowance)),u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"claim",args:[t,r],overrides:e})}to=(0,u.c)((async(t,r,a)=>{const e=await this.getClaimTransaction(t,r,a);return e.setParse((t=>{const a=this.contractWrapper.parseLogs("TokensClaimed",t?.logs)[0].args.startTokenId,e=a.add(r),n=[];for(let r=a;r.lt(e);r=r.add(1))n.push({id:r,receipt:t,data:()=>this.erc721.get(r)});return n})),e}))}class E{featureName=d.cP.name;constructor(t,r,a){this.erc721=t,this.contractWrapper=r,this.storage=a,this.revealer=this.detectErc721Revealable()}lazyMint=(0,u.c)((async(t,r)=>{const a=await this.erc721.nextTokenIdToMint(),n=await(0,p.u)(t,this.storage,a.toNumber(),r),i=(0,p.g)(n);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"lazyMint",args:[n.length,i.endsWith("/")?i:`${i}/`,e.Y0("")],parse:t=>{const r=this.contractWrapper.parseLogs("TokensLazyMinted",t?.logs),a=r[0].args.startTokenId,e=r[0].args.endTokenId,n=[];for(let r=a;r.lte(e);r=r.add(1))n.push({id:r,receipt:t,data:()=>this.erc721.getTokenMetadata(r)});return n}})}));detectErc721Revealable(){if((0,l.d)(this.contractWrapper,"ERC721Revealable"))return new g.D(this.contractWrapper,this.storage,d.cQ.name,(()=>this.erc721.nextTokenIdToMint()))}}class M{featureName=d.cR.name;constructor(t,r,a){this.erc721=t,this.contractWrapper=r,this.storage=a,this.batch=this.detectErc721BatchMintable()}to=(0,u.c)((async(t,r)=>{const[a,e]=await Promise.all([(0,p.b)(r,this.storage),(0,d.aP)(t)]);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"mintTo",args:[e,a],parse:t=>{const r=this.contractWrapper.parseLogs("Transfer",t?.logs);if(0===r.length)throw new Error("TransferEvent event not found");const a=r[0].args.tokenId;return{id:a,receipt:t,data:()=>this.erc721.get(a)}}})}));async getMintTransaction(t,r){return this.to.prepare(await(0,d.aP)(t),r)}detectErc721BatchMintable(){if((0,l.d)(this.contractWrapper,"ERC721BatchMintable"))return new k(this.erc721,this.contractWrapper,this.storage)}}class v{featureName=d.cS.name;constructor(t,r){this.erc721=t,this.contractWrapper=r}async all(t,r){let a=await this.tokenIds(t);if(r){const t=r?.start||0,e=r?.count||p.D;a=a.slice(t,t+e)}return await Promise.all(a.map((t=>this.erc721.get(t.toString()))))}async tokenIds(t){const r=await(0,d.aP)(t||await this.contractWrapper.getSignerAddress()),a=await this.contractWrapper.read("balanceOf",[r]),e=Array.from(Array(a.toNumber()).keys());return await Promise.all(e.map((t=>this.contractWrapper.read("tokenOfOwnerByIndex",[r,t]))))}}class I{featureName=d.cT.name;constructor(t,r){this.erc721=t,this.contractWrapper=r}async all(t,r){let a=await this.tokenIds(t);if(r){const t=r?.start||0,e=r?.count||p.D;a=a.slice(t,t+e)}return await Promise.all(a.map((t=>this.erc721.get(t.toString()))))}async tokenIds(t){const r=await(0,d.aP)(t||await this.contractWrapper.getSignerAddress());return await this.contractWrapper.read("tokensOfOwner",[r])}}class R{featureName=d.cU.name;constructor(t,r){this.erc721=t,this.contractWrapper=r,this.owned=this.detectErc721Owned()}async all(t){let r=n.O$.from(0);(0,l.h)("startTokenId",this.contractWrapper)&&(r=await this.contractWrapper.read("startTokenId",[]));const a=n.O$.from(t?.start||0).add(r).toNumber(),e=n.O$.from(t?.count||p.D).toNumber(),i=await this.erc721.nextTokenIdToMint(),s=Math.min(i.add(r).toNumber(),a+e);return await Promise.all([...Array(s-a).keys()].map((t=>this.erc721.get((a+t).toString()))))}async allOwners(){let t,r=n.O$.from(0);(0,l.h)("startTokenId",this.contractWrapper)&&(r=await this.contractWrapper.read("startTokenId",[]));try{t=await this.erc721.totalClaimedSupply()}catch(r){t=await this.totalCount()}t=t.add(r);const a=[...new Array(t.toNumber()).keys()],e=await Promise.all(a.map((t=>this.erc721.ownerOf(t).catch((()=>i.d)))));return a.map((t=>({tokenId:t,owner:e[t]}))).filter((t=>t.owner!==i.d))}async totalCount(){return await this.erc721.nextTokenIdToMint()}async totalCirculatingSupply(){return await this.contractWrapper.read("totalSupply",[])}detectErc721Owned(){return(0,l.d)(this.contractWrapper,"ERC721Enumerable")?new v(this.erc721,this.contractWrapper):(0,l.d)(this.contractWrapper,"ERC721AQueryable")?new I(this.erc721,this.contractWrapper):void 0}}const N=(()=>b.B.extend({tierPriority:C.z.array(C.z.string()),royaltyRecipient:d.bd.default(i.d),royaltyBps:d.cF.default(0),quantity:d.b9.default(1)}))(),A=[{name:"validityStartTimestamp",type:"uint128"},{name:"validityEndTimestamp",type:"uint128"},{name:"uid",type:"bytes32"},{name:"data",type:"bytes"}];class O{featureName=d.cV.name;constructor(t,r,a){this.erc721=t,this.contractWrapper=r,this.storage=a}async getMetadataInTier(t){const r=(await this.contractWrapper.read("getMetadataForAllTiers",[])).find((r=>r.tier===t));if(!r)throw new Error("Tier not found in contract.");return await Promise.all(r.ranges.map(((t,a)=>{const e=[],n=r.baseURIs[a];for(let r=t.startIdInclusive.toNumber();r<t.endIdNonInclusive.toNumber();r++){const t=n.endsWith("/")?`${n}${r}`:`${n}/${r}`,a=this.storage.downloadJSON(t);e.push(a)}return e})).flat())}async getTokensInTier(t){const r=await this.contractWrapper.read("getTokensInTierLen",[]);if(r.eq(0))return[];const a=await this.contractWrapper.read("getTokensInTier",[t,0,r]);return await Promise.all(a.map((t=>{const r=[];for(let a=t.startIdInclusive.toNumber();a<t.endIdNonInclusive.toNumber();a++)r.push(this.erc721.get(a));return r})).flat())}createBatchWithTier=(0,u.c)((async(t,r,a)=>{const n=await this.erc721.nextTokenIdToMint(),i=await(0,p.u)(t,this.storage,n.toNumber(),a),s=(0,p.g)(i);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"lazyMint",args:[i.length,s.endsWith("/")?s:`${s}/`,r,e.Y0("")],parse:t=>{const r=this.contractWrapper.parseLogs("TokensLazyMinted",t?.logs),a=r[0].args[1],e=r[0].args[2],n=[];for(let r=a;r.lte(e);r=r.add(1))n.push({id:r,receipt:t,data:()=>this.erc721.getTokenMetadata(r)});return n}})}));createDelayedRevealBatchWithTier=(0,u.c)((async(t,r,a,n,i)=>{if(!a)throw new Error("Password is required");const o=await this.storage.uploadBatch([w.a.parse(t)],{rewriteFileNames:{fileStartNumber:0}}),d=(0,p.g)(o),h=await this.erc721.nextTokenIdToMint(),l=await this.storage.uploadBatch(r.map((t=>w.a.parse(t))),{onProgress:i?.onProgress,rewriteFileNames:{fileStartNumber:h.toNumber()}}),m=(0,p.g)(l),g=await this.contractWrapper.read("getBaseURICount",[]),y=await this.contractWrapper.getChainID(),W=s.keccak256(["string","uint256","uint256","address"],[a,y,g,this.contractWrapper.address]),T=await this.contractWrapper.read("encryptDecrypt",[e.Y0(m),W]),f=s.keccak256(["bytes","bytes","uint256"],[e.Y0(m),W,y]),C=c.$.encode(["bytes","bytes32"],[T,f]);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"lazyMint",args:[l.length,d.endsWith("/")?d:`${d}/`,n,C],parse:t=>{const r=this.contractWrapper.parseLogs("TokensLazyMinted",t?.logs),a=r[0].args[1],e=r[0].args[2],n=[];for(let r=a;r.lte(e);r=r.add(1))n.push({id:r,receipt:t,data:()=>this.erc721.getTokenMetadata(r)});return n}})}));reveal=(0,u.c)((async(t,r)=>{if(!r)throw new Error("Password is required");const a=await this.contractWrapper.getChainID(),e=s.keccak256(["string","uint256","uint256","address"],[r,a,t,this.contractWrapper.address]);try{const r=await this.contractWrapper.callStatic().reveal(t,e);if(!r.includes("://")||!r.endsWith("/"))throw new Error("invalid password")}catch(t){throw new Error("invalid password")}return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"reveal",args:[t,e]})}));async generate(t){const[r]=await this.generateBatch([t]);return r}async generateBatch(t){const r=await Promise.all(t.map((t=>N.parseAsync(t)))),a=await this.contractWrapper.getChainID(),e=this.contractWrapper.getSigner();return(0,T.Z)(e,"No signer available"),await Promise.all(r.map((async t=>({payload:t,signature:(await this.contractWrapper.signTypedData(e,{name:"SignatureAction",version:"1",chainId:a,verifyingContract:this.contractWrapper.address},{GenericRequest:A},await this.mapPayloadToContractStruct(t))).toString()}))))}async verify(t){const r=await this.mapPayloadToContractStruct(t.payload);return(await this.contractWrapper.read("verify",[r,t.signature]))[0]}async claimWithSignature(t){const r=await this.mapPayloadToContractStruct(t.payload),a=await(0,f.n)(this.contractWrapper.getProvider(),t.payload.price,t.payload.currencyAddress),e=await this.contractWrapper.getCallOverrides();await(0,w.s)(this.contractWrapper,a,t.payload.currencyAddress,e);const n=await this.contractWrapper.sendTransaction("claimWithSignature",[r,t.signature],e),i=this.contractWrapper.parseLogs("TokensClaimed",n?.logs),s=i[0].args.startTokenId,c=s.add(i[0].args.quantityClaimed),o=[];for(let t=s;t.lt(c);t=t.add(1))o.push({id:t,receipt:n,data:()=>this.erc721.get(t)});return o}async mapPayloadToContractStruct(t){const r=await(0,f.n)(this.contractWrapper.getProvider(),t.price,t.currencyAddress),a=c.$.encode(["string[]","address","address","uint256","address","uint256","uint256","address"],[t.tierPriority,t.to,t.royaltyRecipient,t.royaltyBps,t.primarySaleRecipient,t.quantity,r,t.currencyAddress]);return{uid:t.uid,validityStartTimestamp:t.mintStartTime,validityEndTimestamp:t.mintEndTime,data:a}}}class L{featureName=d.cW.name;constructor(t){this.contractWrapper=t}token=(0,u.c)((async t=>u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"burn",args:[t]})))}class B{featureName=d.cX.name;constructor(t,r){this.erc721=t,this.contractWrapper=r}to=(0,u.c)((async(t,r,a)=>{if(t!==await(this.contractWrapper.getSigner()?.getAddress()))throw new Error("Zora Drop: Destination address must match connected wallet address");if(a?.pricePerToken)throw new Error("Zora Drop: Custom pricePerToken is not supported. Price is automatically calculated");const e=(await this.getSaleDetails()).publicSalePrice,i=(s="0.000777",o.parseEther(d.cz.parse(s)));var s;const c=n.O$.from(e).add(i).mul(r),p=u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"purchase",args:[r],overrides:{value:c}});return p.setParse((t=>{const a=this.contractWrapper.parseLogs("Sale",t?.logs)[0].args.firstPurchasedTokenId,e=a.add(r),n=[];for(let r=a;r.lt(e);r=r.add(1))n.push({id:r,receipt:t,data:()=>this.erc721.get(r)});return n})),p}));async getSaleDetails(){return this.contractWrapper.read("saleDetails",[])}}class D{featureName=d.cY.name;constructor(t){this.contractWrapper=t}cancel=(0,u.c)((async t=>u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"cancel",args:[t]})));revoke=(0,u.c)((async t=>u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"revoke",args:[t]})))}class q{featureName=d.cZ.name;constructor(t,r){this.contractWrapper=t,this.storage=r}update=(0,u.c)((async(t,r)=>{const a=await(0,p.b)(r,this.storage);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setTokenURI",args:[t,a]})}))}class x{featureName=d.c_.name;constructor(t,r){this.contractWrapper=t,this.storage=r}async get(){const t=await this.contractWrapper.read("sharedMetadata",[]);if(!t.every((t=>""===t)))return{name:t.name,description:t.description,image:t.imageURI,animation_url:t.animationURI}}set=(0,u.c)((async t=>{const r=w.B.parse(t);r.description=this.sanitizeJSONString(r.description);const a=[];(0,W.XT)(r.image)?a.push(this.storage.upload(r.image)):"string"==typeof r.image?a.push(Promise.resolve(r.image)):a.push(Promise.resolve(void 0)),(0,W.XT)(r.animation_url)?a.push(this.storage.upload(r.animation_url)):"string"==typeof r.animation_url?a.push(Promise.resolve(r.animation_url)):a.push(Promise.resolve(void 0));const[e,n]=await Promise.all(a);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setSharedMetadata",args:[{name:`${r.name||""}`,description:r.description||"",imageURI:e||"",animationURI:n||""}]})}));sanitizeJSONString(t){if(!t)return t;const r=JSON.stringify(t);return r.slice(1,r.length-1)}}class z{featureName=d.c$.name;constructor(t,r){this.contractWrapper=t,this.storage=r}mint=(0,u.c)((async t=>{const r=t.payload,a=t.signature,e=await this.contractWrapper.getCallOverrides(),n=t=>{const r=this.contractWrapper.parseLogs("TokensMintedWithSignature",t.logs);if(0===r.length)throw new Error("No MintWithSignature event found");return{id:r[0].args.tokenIdMinted,receipt:t}};if(await this.isLegacyNFTContract()){const t=await this.mapLegacyPayloadToContractStruct(r),i=t.price;return await(0,w.s)(this.contractWrapper,i,r.currencyAddress,e),u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"mintWithSignature",args:[t,a],overrides:e,parse:n})}{const t=await this.mapPayloadToContractStruct(r),i=t.pricePerToken.mul(t.quantity);return await(0,w.s)(this.contractWrapper,i,r.currencyAddress,e),u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"mintWithSignature",args:[t,a],overrides:e,parse:n})}}));mintBatch=(0,u.c)((async t=>{const r=await this.isLegacyNFTContract(),a=(await Promise.all(t.map((t=>r?this.mapLegacyPayloadToContractStruct(t.payload):this.mapPayloadToContractStruct(t.payload))))).map(((r,a)=>{const e=t[a],i=e.signature,s=e.payload.price;if(n.O$.from(s).gt(0))throw new Error("Can only batch free mints. For mints with a price, use regular mint()");return{message:r,signature:i}})),e=new y.C(this.contractWrapper),i=a.map((t=>e.encode("mintWithSignature",[t.message,t.signature])));if((0,l.h)("multicall",this.contractWrapper))return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[i],parse:t=>{const r=this.contractWrapper.parseLogs("TokensMintedWithSignature",t.logs);if(0===r.length)throw new Error("No MintWithSignature event found");return r.map((r=>({id:r.args.tokenIdMinted,receipt:t})))}});throw new Error("Multicall not available on this contract!")}));async verify(t){const r=await this.isLegacyNFTContract(),a=t.payload,e=t.signature;let n,i;return r?(n=await this.mapLegacyPayloadToContractStruct(a),i=await this.contractWrapper.read("verify",[n,e])):(n=await this.mapPayloadToContractStruct(a),i=await this.contractWrapper.read("verify",[n,e])),i[0]}async generate(t){return(await this.generateBatch([t]))[0]}async generateBatch(t){const r=await this.isLegacyNFTContract(),a=await Promise.all(t.map((t=>b.q.parseAsync(t)))),e=a.map((t=>t.metadata)),n=await(0,p.u)(e,this.storage),i=await this.contractWrapper.getChainID(),s=this.contractWrapper.getSigner();return(0,T.Z)(s,"No signer available"),await Promise.all(a.map((async(t,a)=>{const e=n[a],c=await b.r.parseAsync({...t,uri:e});let o;return o=r?await this.contractWrapper.signTypedData(s,{name:"TokenERC721",version:"1",chainId:i,verifyingContract:this.contractWrapper.address},{MintRequest:b.s},await this.mapLegacyPayloadToContractStruct(c)):await this.contractWrapper.signTypedData(s,{name:"SignatureMintERC721",version:"1",chainId:i,verifyingContract:await this.contractWrapper.address},{MintRequest:b.u},await this.mapPayloadToContractStruct(c)),{payload:c,signature:o.toString()}})))}async mapPayloadToContractStruct(t){const r=await(0,f.n)(this.contractWrapper.getProvider(),t.price,t.currencyAddress);return{to:t.to,royaltyRecipient:t.royaltyRecipient,royaltyBps:t.royaltyBps,primarySaleRecipient:t.primarySaleRecipient,uri:t.uri,quantity:t.quantity,pricePerToken:r,currency:t.currencyAddress,validityStartTimestamp:t.mintStartTime,validityEndTimestamp:t.mintEndTime,uid:t.uid}}async mapLegacyPayloadToContractStruct(t){const r=await(0,f.n)(this.contractWrapper.getProvider(),t.price,t.currencyAddress);return{to:t.to,price:r,uri:t.uri,currency:t.currencyAddress,validityEndTimestamp:t.mintEndTime,validityStartTimestamp:t.mintStartTime,uid:t.uid,royaltyRecipient:t.royaltyRecipient,royaltyBps:t.royaltyBps,primarySaleRecipient:t.primarySaleRecipient}}async isLegacyNFTContract(){return(0,l.d)(this.contractWrapper,"ERC721SignatureMintV1")}}class ${featureName=d.d0.name;get chainId(){return this._chainId}constructor(t,r,a){this.contractWrapper=t,this.storage=r,this.query=this.detectErc721Enumerable(),this.mintable=this.detectErc721Mintable(),this.burnable=this.detectErc721Burnable(),this.lazyMintable=this.detectErc721LazyMintable(),this.tieredDropable=this.detectErc721TieredDrop(),this.signatureMintable=this.detectErc721SignatureMintable(),this.claimWithConditions=this.detectErc721ClaimableWithConditions(),this.claimCustom=this.detectErc721Claimable(),this.claimZora=this.detectErc721ClaimableZora(),this.erc721SharedMetadata=this.detectErc721SharedMetadata(),this.loyaltyCard=this.detectErc721LoyaltyCard(),this.updatableMetadata=this.detectErc721UpdatableMetadata(),this._chainId=a}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async get(t){const[r,a]=await Promise.all([this.ownerOf(t).catch((()=>i.d)),this.getTokenMetadata(t).catch((()=>({id:t.toString(),uri:"",...p.F})))]);return{owner:r,metadata:a,type:"ERC721",supply:"1"}}async ownerOf(t){return await this.contractWrapper.read("ownerOf",[t])}async balanceOf(t){return await this.contractWrapper.read("balanceOf",[await(0,d.aP)(t)])}async balance(){return await this.balanceOf(await this.contractWrapper.getSignerAddress())}async isApproved(t,r){const[a,e]=await Promise.all([(0,d.aP)(t),(0,d.aP)(r)]);return await this.contractWrapper.read("isApprovedForAll",[a,e])}transfer=(0,u.c)((async(t,r)=>{const[a,e]=await Promise.all([this.contractWrapper.getSignerAddress(),(0,d.aP)(t)]);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"transferFrom(address,address,uint256)",args:[a,e,r]})}));transferFrom=(0,u.c)((async(t,r,a)=>{const[e,n]=await Promise.all([(0,d.aP)(t),(0,d.aP)(r)]);return u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"transferFrom(address,address,uint256)",args:[e,n,a]})}));setApprovalForAll=(0,u.c)((async(t,r)=>u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setApprovalForAll",args:[await(0,d.aP)(t),r]})));setApprovalForToken=(0,u.c)((async(t,r)=>u.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"approve",args:[await(0,d.aP)(t),r]})));async getAll(t){return(0,h.a)(this.query,d.cU).all(t)}async getAllOwners(){return(0,h.a)(this.query,d.cU).allOwners()}async totalCount(){return this.nextTokenIdToMint()}async totalCirculatingSupply(){return(0,h.a)(this.query,d.cU).totalCirculatingSupply()}async getOwned(t,r){if(t&&(t=await(0,d.aP)(t)),this.query?.owned)return this.query.owned.all(t,r);{const[a,e]=await Promise.all([t||this.contractWrapper.getSignerAddress(),this.getAllOwners()]);let n=(e||[]).filter((t=>a?.toLowerCase()===t.owner?.toLowerCase()));if(r){const t=r?.start||0,a=r?.count||p.D;n=n.slice(t,t+a)}return await Promise.all(n.map((async t=>this.get(t.tokenId))))}}async getOwnedTokenIds(t){if(t&&(t=await(0,d.aP)(t)),this.query?.owned)return this.query.owned.tokenIds(t);{const[r,a]=await Promise.all([t||this.contractWrapper.getSignerAddress(),this.getAllOwners()]);return(a||[]).filter((t=>r?.toLowerCase()===t.owner?.toLowerCase())).map((t=>n.O$.from(t.tokenId)))}}mint=(0,u.c)((async t=>this.mintTo.prepare(await this.contractWrapper.getSignerAddress(),t)));mintTo=(0,u.c)((async(t,r)=>(0,h.a)(this.mintable,d.cR).to.prepare(t,r)));async getMintTransaction(t,r){return this.mintTo.prepare(t,r)}mintBatch=(0,u.c)((async t=>this.mintBatchTo.prepare(await this.contractWrapper.getSignerAddress(),t)));mintBatchTo=(0,u.c)((async(t,r)=>(0,h.a)(this.mintable?.batch,d.cM).to.prepare(t,r)));burn=(0,u.c)((async t=>(0,h.a)(this.burnable,d.cW).token.prepare(t)));cancel=(0,u.c)((async t=>(0,h.a)(this.loyaltyCard,d.cY).cancel.prepare(t)));revoke=(0,u.c)((async t=>(0,h.a)(this.loyaltyCard,d.cY).revoke.prepare(t)));lazyMint=(0,u.c)((async(t,r)=>(0,h.a)(this.lazyMintable,d.cP).lazyMint.prepare(t,r)));update=(0,u.c)((async(t,r)=>(0,h.a)(this.updatableMetadata,d.cZ).update.prepare(t,r)));claim=(0,u.c)((async(t,r)=>this.claimTo.prepare(await this.contractWrapper.getSignerAddress(),t,r)));claimTo=(0,u.c)((async(t,r,a)=>{const e=this.claimWithConditions,n=this.claimCustom,i=this.claimZora;if(e)return e.to.prepare(t,r,a);if(n)return n.to.prepare(t,r,a);if(i)return i.to.prepare(t,r,a);throw new d.x(d.cO)}));async getClaimTransaction(t,r,a){const e=this.claimWithConditions,n=this.claimCustom;if(e)return e.conditions.getClaimTransaction(t,r,a);if(n)return n.getClaimTransaction(t,r,a);throw new d.x(d.cO)}async totalClaimedSupply(){const t=this.contractWrapper;if((0,l.h)("totalMinted",t))return this.contractWrapper.read("totalMinted",[]);if((0,l.h)("nextTokenIdToClaim",t))return this.contractWrapper.read("nextTokenIdToClaim",[]);throw new Error("No function found on contract to get total claimed supply")}async totalUnclaimedSupply(){const[t,r]=await Promise.all([this.nextTokenIdToMint(),this.totalClaimedSupply()]);return t.sub(r)}get claimConditions(){return(0,h.a)(this.claimWithConditions,d.cN).conditions}get tieredDrop(){return(0,h.a)(this.tieredDropable,d.cV)}get signature(){return(0,h.a)(this.signatureMintable,d.c$)}get revealer(){return(0,h.a)(this.lazyMintable?.revealer,d.cQ)}get sharedMetadata(){return(0,h.a)(this.erc721SharedMetadata,d.c_)}async getTokenMetadata(t){const r=await this.contractWrapper.read("tokenURI",[t]);if(!r)throw new d.n;return(0,p.f)(t,r,this.storage)}async nextTokenIdToMint(){if((0,l.h)("nextTokenIdToMint",this.contractWrapper)){let t=await this.contractWrapper.read("nextTokenIdToMint",[]);return(0,l.h)("startTokenId",this.contractWrapper)&&(t=t.sub(await this.contractWrapper.read("startTokenId",[]))),t}if((0,l.h)("totalSupply",this.contractWrapper))return await this.contractWrapper.read("totalSupply",[]);throw new Error("Contract requires either `nextTokenIdToMint` or `totalSupply` function available to determine the next token ID to mint")}detectErc721Enumerable(){if((0,l.d)(this.contractWrapper,"ERC721Supply")||(0,l.h)("nextTokenIdToMint",this.contractWrapper))return new R(this,this.contractWrapper)}detectErc721Mintable(){if((0,l.d)(this.contractWrapper,"ERC721Mintable"))return new M(this,this.contractWrapper,this.storage)}detectErc721Burnable(){if((0,l.d)(this.contractWrapper,"ERC721Burnable"))return new L(this.contractWrapper)}detectErc721LazyMintable(){if((0,l.d)(this.contractWrapper,"ERC721LazyMintable"))return new E(this,this.contractWrapper,this.storage)}detectErc721TieredDrop(){if((0,l.d)(this.contractWrapper,"ERC721TieredDrop"))return new O(this,this.contractWrapper,this.storage)}detectErc721SignatureMintable(){if((0,l.d)(this.contractWrapper,"ERC721SignatureMintV1")||(0,l.d)(this.contractWrapper,"ERC721SignatureMintV2"))return new z(this.contractWrapper,this.storage)}detectErc721ClaimableWithConditions(){if((0,l.d)(this.contractWrapper,"ERC721ClaimConditionsV1")||(0,l.d)(this.contractWrapper,"ERC721ClaimConditionsV2")||(0,l.d)(this.contractWrapper,"ERC721ClaimPhasesV1")||(0,l.d)(this.contractWrapper,"ERC721ClaimPhasesV2"))return new S(this,this.contractWrapper,this.storage)}detectErc721Claimable(){if((0,l.d)(this.contractWrapper,"ERC721ClaimCustom"))return new P(this,this.contractWrapper)}detectErc721ClaimableZora(){if((0,l.d)(this.contractWrapper,"ERC721ClaimZora"))return new B(this,this.contractWrapper)}detectErc721SharedMetadata(){if((0,l.d)(this.contractWrapper,"ERC721SharedMetadata"))return new x(this.contractWrapper,this.storage)}detectErc721LoyaltyCard(){if((0,l.d)(this.contractWrapper,"ERC721LoyaltyCard"))return new D(this.contractWrapper)}detectErc721UpdatableMetadata(){if((0,l.d)(this.contractWrapper,"ERC721UpdatableMetadata"))return new q(this.contractWrapper,this.storage)}}}}]);