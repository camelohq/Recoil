"use strict";function _interopDefault(ex){return ex&&"object"==typeof ex&&"default"in ex?ex.default:ex}Object.defineProperty(exports,"__esModule",{value:!0});var reactNative=_interopDefault(require("react-native")),react=_interopDefault(require("react"));const{unstable_batchedUpdates:unstable_batchedUpdates}=reactNative;var ReactBatchedUpdates_native={unstable_batchedUpdates:unstable_batchedUpdates};let batch=function(){throw new Error("No batching function specified.")};var Recoil_batch={setBatch:newBatch=>batch=newBatch,batchUpdates:callback=>batch(callback)};var Recoil_CopyOnWrite={setByAddingToSet:function(set,v){const next=new Set(set);return next.add(v),next},setByDeletingFromSet:function(set,v){const next=new Set(set);return next.delete(v),next},mapBySettingInMap:function(map,k,v){const next=new Map(map);return next.set(k,v),next},mapByUpdatingInMap:function(map,k,updater){const next=new Map(map);return next.set(k,updater(next.get(k))),next},mapByDeletingFromMap:function(map,k){const next=new Map(map);return next.delete(k),next}};var Recoil_isNode=function(object){var _ownerDocument,_doc$defaultView;if("undefined"==typeof window)return!1;const defaultView=null!==(_doc$defaultView=(null!=object?null!==(_ownerDocument=object.ownerDocument)&&void 0!==_ownerDocument?_ownerDocument:object:document).defaultView)&&void 0!==_doc$defaultView?_doc$defaultView:window;return!(null==object||!("function"==typeof defaultView.Node?object instanceof defaultView.Node:"object"==typeof object&&"number"==typeof object.nodeType&&"string"==typeof object.nodeName))};var Recoil_isPromise=function(p){return!!p&&"function"==typeof p.then};var Recoil_deepFreezeValue=function deepFreezeValue(value){if("object"==typeof value&&!function(value){if(null===value||"object"!=typeof value)return!0;switch(typeof value.$$typeof){case"symbol":case"number":return!0}return null!=value["@@__IMMUTABLE_ITERABLE__@@"]||null!=value["@@__IMMUTABLE_KEYED__@@"]||null!=value["@@__IMMUTABLE_INDEXED__@@"]||null!=value["@@__IMMUTABLE_ORDERED__@@"]||null!=value["@@__IMMUTABLE_RECORD__@@"]||(!!Recoil_isNode(value)||!!Recoil_isPromise(value))}(value)){Object.freeze(value);for(const prop in value)value.hasOwnProperty(prop)&&deepFreezeValue(value[prop]);Object.seal(value)}};var Recoil_nullthrows=function(x,message){if(null!=x)return x;throw new Error(null!=message?message:"Got unexpected null or undefined")};const loadableAccessors={getValue(){if("hasValue"!==this.state)throw this.contents;return this.contents},toPromise(){return"hasValue"===this.state?Promise.resolve(this.contents):"hasError"===this.state?Promise.reject(this.contents):this.contents},valueMaybe(){return"hasValue"===this.state?this.contents:void 0},valueOrThrow(){if("hasValue"!==this.state)throw new Error(`Loadable expected value, but in "${this.state}" state`);return this.contents},errorMaybe(){return"hasError"===this.state?this.contents:void 0},errorOrThrow(){if("hasError"!==this.state)throw new Error(`Loadable expected error, but in "${this.state}" state`);return this.contents},promiseMaybe(){return"loading"===this.state?this.contents:void 0},promiseOrThrow(){if("loading"!==this.state)throw new Error(`Loadable expected promise, but in "${this.state}" state`);return this.contents},map(map){if("hasError"===this.state)return this;if("hasValue"===this.state)try{const next=map(this.contents);return Recoil_isPromise(next)?loadableWithPromise(next):loadableWithValue(next)}catch(e){return Recoil_isPromise(e)?loadableWithPromise(e.next(()=>map(this.contents))):loadableWithError(e)}if("loading"===this.state)return loadableWithPromise(this.contents.then(map).catch(e=>{if(Recoil_isPromise(e))return e.then(()=>map(this.contents));throw e}));throw new Error("Invalid Loadable state")}};function loadableWithValue(value){return Object.freeze({state:"hasValue",contents:value,...loadableAccessors})}function loadableWithError(error){return Object.freeze({state:"hasError",contents:error,...loadableAccessors})}function loadableWithPromise(promise){return Object.freeze({state:"loading",contents:promise,...loadableAccessors})}var Recoil_Loadable={loadableWithValue:loadableWithValue,loadableWithError:loadableWithError,loadableWithPromise:loadableWithPromise,loadableLoading:function(){return loadableWithPromise(new Promise(()=>{}))},loadableAll:function(inputs){return inputs.every(i=>"hasValue"===i.state)?loadableWithValue(inputs.map(i=>i.contents)):inputs.some(i=>"hasError"===i.state)?loadableWithError(Recoil_nullthrows(inputs.find(i=>"hasError"===i.state),"Invalid loadable passed to loadableAll").contents):loadableWithPromise(Promise.all(inputs.map(i=>i.contents)))}};class AbstractRecoilValue{constructor(newKey){this.key=newKey}}var Recoil_RecoilValueClasses={AbstractRecoilValue:AbstractRecoilValue,RecoilState:class extends AbstractRecoilValue{},RecoilValueReadOnly:class extends AbstractRecoilValue{}};class DefaultValue{}const DEFAULT_VALUE=new DefaultValue;class RecoilValueNotReady extends Error{constructor(key){super(`Tried to set the value of Recoil selector ${key} using an updater function, but it is an async selector in a pending or error state; this is not supported.`)}}const nodes=new Map;class NodeMissingError extends Error{}var Recoil_Node={nodes:nodes,registerNode:function(node){if(nodes.has(node.key)){node.key}return nodes.set(node.key,node),null==node.set?new Recoil_RecoilValueClasses.RecoilValueReadOnly(node.key):new Recoil_RecoilValueClasses.RecoilState(node.key)},getNode:function(key){const node=nodes.get(key);if(null==node)throw new NodeMissingError(`Missing definition for RecoilValue: "${key}""`);return node},NodeMissingError:NodeMissingError,DefaultValue:DefaultValue,DEFAULT_VALUE:DEFAULT_VALUE,RecoilValueNotReady:RecoilValueNotReady};var Recoil_Tracing={trace:function(message,node,fn){return fn()},wrap:function(fn){return fn}};const{mapByDeletingFromMap:mapByDeletingFromMap$1,mapBySettingInMap:mapBySettingInMap$1,mapByUpdatingInMap:mapByUpdatingInMap$1,setByAddingToSet:setByAddingToSet$1}=Recoil_CopyOnWrite,{getNode:getNode$1}=Recoil_Node,emptyMap=Object.freeze(new Map),emptySet=Object.freeze(new Set);class ReadOnlyRecoilValueError extends Error{}function getNodeLoadable(store,state,key){return getNode$1(key).get(store,state)}let subscriptionID=0;var Recoil_FunctionalCore={getNodeLoadable:getNodeLoadable,peekNodeLoadable:function(store,state,key){return getNodeLoadable(store,state,key)[1]},setNodeValue:function(store,state,key,newValue){const node=getNode$1(key);if(null==node.set)throw new ReadOnlyRecoilValueError("Attempt to set read-only RecoilValue: "+key);const[newState,writtenNodes]=node.set(store,state,newValue);return[newState,writtenNodes]},setUnvalidatedAtomValue:function(state,key,newValue){return{...state,atomValues:mapByDeletingFromMap$1(state.atomValues,key),nonvalidatedAtoms:mapBySettingInMap$1(state.nonvalidatedAtoms,key,newValue),dirtyAtoms:setByAddingToSet$1(state.dirtyAtoms,key)}},subscribeComponentToNode:function(state,key,callback){const subID=subscriptionID++;return[{...state,nodeToComponentSubscriptions:mapByUpdatingInMap$1(state.nodeToComponentSubscriptions,key,subsForAtom=>mapBySettingInMap$1(null!=subsForAtom?subsForAtom:emptyMap,subID,["TODO debug name",callback]))},function(state){return{...state,nodeToComponentSubscriptions:mapByUpdatingInMap$1(state.nodeToComponentSubscriptions,key,subsForAtom=>mapByDeletingFromMap$1(null!=subsForAtom?subsForAtom:emptyMap,subID))}}]},fireNodeSubscriptions:function(store,updatedNodes,when){var _store$getState$nextT;const state="enqueue"===when&&null!==(_store$getState$nextT=store.getState().nextTree)&&void 0!==_store$getState$nextT?_store$getState$nextT:store.getState().currentTree,dependentNodes=function(state,keys){const dependentNodes=new Set,visitedNodes=new Set,visitingNodes=Array.from(keys);for(let key=visitingNodes.pop();key;key=visitingNodes.pop()){var _state$nodeToNodeSubs;dependentNodes.add(key),visitedNodes.add(key);const subscribedNodes=null!==(_state$nodeToNodeSubs=state.nodeToNodeSubscriptions.get(key))&&void 0!==_state$nodeToNodeSubs?_state$nodeToNodeSubs:emptySet;for(const downstreamNode of subscribedNodes)visitedNodes.has(downstreamNode)||visitingNodes.push(downstreamNode)}return dependentNodes}(state,updatedNodes);for(const key of dependentNodes){var _state$nodeToComponen;(null!==(_state$nodeToComponen=state.nodeToComponentSubscriptions.get(key))&&void 0!==_state$nodeToComponen?_state$nodeToComponen:[]).forEach(([debugName,cb])=>{"enqueue"===when?store.getState().queuedComponentCallbacks.push(cb):cb(state)})}Recoil_Tracing.trace("value became available, waking components",Array.from(updatedNodes).join(", "),()=>{const resolvers=store.getState().suspendedComponentResolvers;resolvers.forEach(r=>r()),resolvers.clear()})},detectCircularDependencies:function detectCircularDependencies(state,stack){if(!stack.length)return;const leaf=stack[stack.length-1],downstream=state.nodeToNodeSubscriptions.get(leaf);if(!(null==downstream?void 0:downstream.size))return;const root=stack[0];if(downstream.has(root))throw new Error("Recoil selector has circular dependencies: "+[...stack,root].reverse().join(" → "));for(const next of downstream)detectCircularDependencies(state,[...stack,next])}};const{getNodeLoadable:getNodeLoadable$1,peekNodeLoadable:peekNodeLoadable$1,setNodeValue:setNodeValue$1,setUnvalidatedAtomValue:setUnvalidatedAtomValue$1,subscribeComponentToNode:subscribeComponentToNode$1}=Recoil_FunctionalCore,{RecoilValue:RecoilValue,AbstractRecoilValue:AbstractRecoilValue$1,RecoilValueReadOnly:RecoilValueReadOnly$1,RecoilState:RecoilState$1}=Recoil_RecoilValueClasses;var Recoil_RecoilValue={AbstractRecoilValue:AbstractRecoilValue$1,RecoilState:RecoilState$1,peekRecoilValueAsLoadable:function(store,{key:key}){const state=store.getState().currentTree;return peekNodeLoadable$1(store,state,key)},getRecoilValueAsLoadable:function(store,{key:key}){let result;return Recoil_Tracing.trace("get RecoilValue",key,()=>store.replaceState(Recoil_Tracing.wrap(state=>{const[newState,loadable]=getNodeLoadable$1(store,state,key);return result=loadable,newState}))),result},setRecoilValue:function(store,{key:key},newValue){Recoil_Tracing.trace("set RecoilValue",key,()=>store.replaceState(Recoil_Tracing.wrap(state=>{const[newState,writtenNodes]=setNodeValue$1(store,state,key,newValue);return store.fireNodeSubscriptions(writtenNodes,"enqueue"),newState})))},setUnvalidatedRecoilValue:function(store,{key:key},newValue){Recoil_Tracing.trace("set unvalidated persisted atom",key,()=>store.replaceState(Recoil_Tracing.wrap(state=>{const newState=setUnvalidatedAtomValue$1(state,key,newValue);return store.fireNodeSubscriptions(new Set([key]),"enqueue"),newState})))},subscribeToRecoilValue:function(store,{key:key},callback){let newState,releaseFn;return Recoil_Tracing.trace("subscribe component to RecoilValue",key,()=>store.replaceState(Recoil_Tracing.wrap(state=>([newState,releaseFn]=subscribeComponentToNode$1(state,key,callback),newState)))),{release:store=>store.replaceState(releaseFn)}},isRecoilValue:function(x){return x instanceof RecoilState$1||x instanceof RecoilValueReadOnly$1}};const LEAF=Symbol("ArrayKeyedMap"),emptyMap$1=new Map;class ArrayKeyedMap{constructor(existing){if(this._base=new Map,existing instanceof ArrayKeyedMap)for(const[k,v]of existing.entries())this.set(k,v);else if(existing)for(const[k,v]of existing)this.set(k,v);return this}get(key){const ks=Array.isArray(key)?key:[key];let map=this._base;return ks.forEach(k=>{var _map$get;map=null!==(_map$get=map.get(k))&&void 0!==_map$get?_map$get:emptyMap$1}),void 0===map?void 0:map.get(LEAF)}set(key,value){const ks=Array.isArray(key)?key:[key];let map=this._base,next=map;return ks.forEach(k=>{next=map.get(k),next||(next=new Map,map.set(k,next)),map=next}),next.set(LEAF,value),this}delete(key){const ks=Array.isArray(key)?key:[key];let map=this._base,next=map;return ks.forEach(k=>{next=map.get(k),next||(next=new Map,map.set(k,next)),map=next}),next.delete(LEAF),this}entries(){const answer=[];return function recurse(level,prefix){level.forEach((v,k)=>{k===LEAF?answer.push([prefix,v]):recurse(v,prefix.concat(k))})}(this._base,[]),answer.values()}toBuiltInMap(){return new Map(this.entries())}}var Recoil_ArrayKeyedMap=ArrayKeyedMap;var Recoil_cacheWithReferenceEquality=function(){return new Recoil_ArrayKeyedMap};var Recoil_PerformanceTimings={startPerfBlock:function(id){return()=>{}}};var Recoil_differenceSets=function(set,...setsWithValuesToRemove){const ret=new Set;FIRST:for(const value of set){for(const otherSet of setsWithValuesToRemove)if(otherSet.has(value))continue FIRST;ret.add(value)}return ret};var Recoil_everySet=function(set,callback,context){const iterator=set.entries();let current=iterator.next();for(;!current.done;){const entry=current.value;if(!callback.call(context,entry[1],entry[0],set))return!1;current=iterator.next()}return!0};var Recoil_equalsSet=function(one,two){return one.size===two.size&&Recoil_everySet(one,value=>two.has(value))};Object.freeze(new Set);const{mapBySettingInMap:mapBySettingInMap$2,mapByUpdatingInMap:mapByUpdatingInMap$2,setByAddingToSet:setByAddingToSet$2,setByDeletingFromSet:setByDeletingFromSet$1}=Recoil_CopyOnWrite,{detectCircularDependencies:detectCircularDependencies$1,getNodeLoadable:getNodeLoadable$2,setNodeValue:setNodeValue$2}=Recoil_FunctionalCore,{loadableWithError:loadableWithError$1,loadableWithPromise:loadableWithPromise$1,loadableWithValue:loadableWithValue$1}=Recoil_Loadable,{DEFAULT_VALUE:DEFAULT_VALUE$1,RecoilValueNotReady:RecoilValueNotReady$1,registerNode:registerNode$1}=Recoil_Node,{startPerfBlock:startPerfBlock$1}=Recoil_PerformanceTimings,{isRecoilValue:isRecoilValue$1}=Recoil_RecoilValue,emptySet$2=Object.freeze(new Set);function cacheKeyFromDepValues(depValues){const answer=[];for(const key of Array.from(depValues.keys()).sort()){const loadable=Recoil_nullthrows(depValues.get(key));answer.push(key),answer.push(loadable.contents)}return answer}var Recoil_selector=function(options){const{key:key,get:get,cacheImplementation_UNSTABLE:cacheImplementation}=options,set=null!=options.set?options.set:void 0;let cache=null!=cacheImplementation?cacheImplementation:Recoil_cacheWithReferenceEquality();function getFromCache(store,state){var _state$nodeDeps$get;let newState=state;const currentDeps=null!==(_state$nodeDeps$get=state.nodeDeps.get(key))&&void 0!==_state$nodeDeps$get?_state$nodeDeps$get:emptySet$2,cacheKey=cacheKeyFromDepValues(new Map(Array.from(currentDeps).sort().map(depKey=>{const[nextState,loadable]=getNodeLoadable$2(store,newState,depKey);return newState=nextState,[depKey,loadable]}))),cached=cache.get(cacheKey);if(null!=cached)return[newState,cached];const[nextState,loadable,newDepValues]=function(store,state){var _state$nodeDeps$get2;const[newStateFromEvaluate,loadable,newDepValues]=function(store,state){const endPerfBlock=startPerfBlock$1(key);let newState=state;const depValues=new Map;function getRecoilValue({key:key}){let loadable;if([newState,loadable]=getNodeLoadable$2(store,state,key),depValues.set(key,loadable),"hasValue"===loadable.state)return loadable.contents;throw loadable.contents}try{const output=get({get:getRecoilValue}),result=isRecoilValue$1(output)?getRecoilValue(output):output,loadable=Recoil_isPromise(result)?loadableWithPromise$1(result.finally(endPerfBlock)):(endPerfBlock(),loadableWithValue$1(result));return[newState,loadable,depValues]}catch(errorOrDepPromise){const loadable=Recoil_isPromise(errorOrDepPromise)?loadableWithPromise$1(errorOrDepPromise.then(()=>{let loadable=loadableWithError$1(new Error("Internal Recoil Selector Error"));if(store.replaceState(asyncState=>{let newAsyncState;return[newAsyncState,loadable]=getFromCache(store,asyncState),newAsyncState}),"hasError"===loadable.state)throw loadable.contents;return loadable.contents}).finally(endPerfBlock)):(endPerfBlock(),loadableWithError$1(errorOrDepPromise));return[newState,loadable,depValues]}}(store,state);let newState=newStateFromEvaluate;const oldDeps=null!==(_state$nodeDeps$get2=state.nodeDeps.get(key))&&void 0!==_state$nodeDeps$get2?_state$nodeDeps$get2:emptySet$2,newDeps=new Set(newDepValues.keys());newState=Recoil_equalsSet(oldDeps,newDeps)?newState:{...newState,nodeDeps:mapBySettingInMap$2(newState.nodeDeps,key,newDeps)};const addedDeps=Recoil_differenceSets(newDeps,oldDeps),removedDeps=Recoil_differenceSets(oldDeps,newDeps);for(const upstreamNode of addedDeps)newState={...newState,nodeToNodeSubscriptions:mapByUpdatingInMap$2(newState.nodeToNodeSubscriptions,upstreamNode,subs=>setByAddingToSet$2(null!=subs?subs:emptySet$2,key))};for(const upstreamNode of removedDeps)newState={...newState,nodeToNodeSubscriptions:mapByUpdatingInMap$2(newState.nodeToNodeSubscriptions,upstreamNode,subs=>setByDeletingFromSet$1(null!=subs?subs:emptySet$2,key))};return[newState,loadable,newDepValues]}(store,newState);newState=nextState;const newCacheKey=cacheKeyFromDepValues(newDepValues);return function(store,cacheKey,loadable){"loading"!==loadable.state?!0==!options.dangerouslyAllowMutability&&Recoil_deepFreezeValue(loadable.contents):loadable.contents.then(result=>(!0==!options.dangerouslyAllowMutability&&Recoil_deepFreezeValue(result),cache=cache.set(cacheKey,loadableWithValue$1(result)),store.fireNodeSubscriptions(new Set([key]),"now"),result)).catch(error=>(Recoil_isPromise(error)||(!0==!options.dangerouslyAllowMutability&&Recoil_deepFreezeValue(error),cache=cache.set(cacheKey,loadableWithError$1(error)),store.fireNodeSubscriptions(new Set([key]),"now")),error)),cache=cache.set(cacheKey,loadable)}(store,newCacheKey,loadable),[newState,loadable]}function myGet(store,state){return getFromCache(store,state)}if(null!=set){return registerNode$1({key:key,options:options,get:myGet,set:function(store,state,newValue){let newState=state;const writtenNodes=new Set;function getRecoilValue({key:key}){const[nextState,loadable]=getNodeLoadable$2(store,newState,key);if(newState=nextState,"hasValue"===loadable.state)return loadable.contents;throw"loading"===loadable.state?new RecoilValueNotReady$1(key):loadable.contents}function setRecoilState(recoilState,valueOrUpdater){const newValue="function"==typeof valueOrUpdater?valueOrUpdater(getRecoilValue(recoilState)):valueOrUpdater;let written;[newState,written]=setNodeValue$2(store,newState,recoilState.key,newValue),written.forEach(atom=>writtenNodes.add(atom))}return set({set:setRecoilState,get:getRecoilValue,reset:function(recoilState){setRecoilState(recoilState,DEFAULT_VALUE$1)}},newValue),[newState,writtenNodes]}})}return registerNode$1({key:key,options:options,get:myGet})};const{mapByDeletingFromMap:mapByDeletingFromMap$2,mapBySettingInMap:mapBySettingInMap$3,setByAddingToSet:setByAddingToSet$3}=Recoil_CopyOnWrite,{loadableWithValue:loadableWithValue$2}=Recoil_Loadable,{DEFAULT_VALUE:DEFAULT_VALUE$2,DefaultValue:DefaultValue$1,registerNode:registerNode$2}=Recoil_Node,{isRecoilValue:isRecoilValue$2}=Recoil_RecoilValue;function atom(options){const{default:optionsDefault,...restOptions}=options;return isRecoilValue$2(optionsDefault)||Recoil_isPromise(optionsDefault)?function(options){const base=atom({...options,default:DEFAULT_VALUE$2,persistence_UNSTABLE:void 0===options.persistence_UNSTABLE?void 0:{...options.persistence_UNSTABLE,validator:storedValue=>storedValue instanceof DefaultValue$1?storedValue:Recoil_nullthrows(options.persistence_UNSTABLE).validator(storedValue,DEFAULT_VALUE$2)}});return Recoil_selector({key:options.key+"__withFallback",get:({get:get})=>{const baseValue=get(base);return baseValue instanceof DefaultValue$1?options.default:baseValue},set:({set:set},newValue)=>set(base,newValue),dangerouslyAllowMutability:options.dangerouslyAllowMutability})}({...restOptions,default:optionsDefault}):function(options){const{key:key,persistence_UNSTABLE:persistence}=options;return registerNode$2({key:key,options:options,get:(_store,state)=>{if(state.atomValues.has(key))return[state,Recoil_nullthrows(state.atomValues.get(key))];if(state.nonvalidatedAtoms.has(key)){if(null==persistence)return[state,loadableWithValue$2(options.default)];const nonvalidatedValue=state.nonvalidatedAtoms.get(key),validatedValue=persistence.validator(nonvalidatedValue,DEFAULT_VALUE$2);return validatedValue instanceof DefaultValue$1?[{...state,nonvalidatedAtoms:mapByDeletingFromMap$2(state.nonvalidatedAtoms,key)},loadableWithValue$2(options.default)]:[{...state,atomValues:mapBySettingInMap$3(state.atomValues,key,loadableWithValue$2(validatedValue)),nonvalidatedAtoms:mapByDeletingFromMap$2(state.nonvalidatedAtoms,key)},loadableWithValue$2(validatedValue)]}return[state,loadableWithValue$2(options.default)]},set:(_store,state,newValue)=>(!0!==options.dangerouslyAllowMutability&&Recoil_deepFreezeValue(newValue),[{...state,dirtyAtoms:setByAddingToSet$3(state.dirtyAtoms,key),atomValues:newValue instanceof DefaultValue$1?mapByDeletingFromMap$2(state.atomValues,key):mapBySettingInMap$3(state.atomValues,key,loadableWithValue$2(newValue)),nonvalidatedAtoms:mapByDeletingFromMap$2(state.nonvalidatedAtoms,key)},new Set([key])])})}({...restOptions,default:optionsDefault})}var Recoil_atom=atom;var Recoil_Queue={enqueueExecution:function(s,f){f()}};const{useContext:useContext,useEffect:useEffect,useRef:useRef,useState:useState}=react,{fireNodeSubscriptions:fireNodeSubscriptions$1,setNodeValue:setNodeValue$3,setUnvalidatedAtomValue:setUnvalidatedAtomValue$2}=Recoil_FunctionalCore;function notInAContext(){throw new Error("This component must be used inside a <RecoilRoot> component.")}const defaultStore=Object.freeze({getState:notInAContext,replaceState:notInAContext,subscribeToTransactions:notInAContext,addTransactionMetadata:notInAContext,fireNodeSubscriptions:notInAContext});function startNextTreeIfNeeded(storeState){null===storeState.nextTree&&(storeState.nextTree={...storeState.currentTree,dirtyAtoms:new Set,transactionMetadata:{}})}const AppContext=react.createContext({current:defaultStore}),useStoreRef=()=>useContext(AppContext);function Batcher(props){const storeRef=useStoreRef(),[_,setState]=useState([]);return props.setNotifyBatcherOfChange(()=>setState({})),useEffect(()=>{Recoil_Queue.enqueueExecution("Batcher",()=>{const storeState=storeRef.current.getState(),{currentTree:currentTree,nextTree:nextTree}=storeState;null!==nextTree&&(nextTree.dirtyAtoms.size&&storeState.transactionSubscriptions.forEach(sub=>sub(storeRef.current,currentTree)),storeState.queuedComponentCallbacks.forEach(cb=>cb(nextTree)),storeState.queuedComponentCallbacks.splice(0,storeState.queuedComponentCallbacks.length),storeState.currentTree=nextTree,storeState.nextTree=null)})}),null}function initialStoreState(store,initializeState){const initial={currentTree:{isSnapshot:!1,transactionMetadata:{},atomValues:new Map,nonvalidatedAtoms:new Map,dirtyAtoms:new Set,nodeDeps:new Map,nodeToNodeSubscriptions:new Map,nodeToComponentSubscriptions:new Map},nextTree:null,transactionSubscriptions:new Map,queuedComponentCallbacks:[],suspendedComponentResolvers:new Set};return initializeState&&initializeState({set:(atom,value)=>{initial.currentTree=setNodeValue$3(store,initial.currentTree,atom.key,value)[0]},setUnvalidatedAtomValues:atomValues=>{atomValues.forEach((v,k)=>{initial.currentTree=setUnvalidatedAtomValue$2(initial.currentTree,k,v)})}}),initial}let nextID=0;var Recoil_RecoilRoot_react={useStoreRef:useStoreRef,RecoilRoot:function({initializeState:initializeState,children:children}){let storeState;const notifyBatcherOfChange=useRef(null),store={getState:()=>storeState.current,replaceState:replacer=>{const storeState=storeRef.current.getState();startNextTreeIfNeeded(storeState);const nextTree=Recoil_nullthrows(storeState.nextTree),replaced=replacer(nextTree);replaced!==nextTree&&(storeState.nextTree=replaced,Recoil_nullthrows(notifyBatcherOfChange.current)())},subscribeToTransactions:callback=>{const id=nextID++;return storeRef.current.getState().transactionSubscriptions.set(id,callback),{release:()=>{storeRef.current.getState().transactionSubscriptions.delete(id)}}},addTransactionMetadata:metadata=>{startNextTreeIfNeeded(storeRef.current.getState());for(const k of Object.keys(metadata))Recoil_nullthrows(storeRef.current.getState().nextTree).transactionMetadata[k]=metadata[k]},fireNodeSubscriptions:function(updatedNodes,when){fireNodeSubscriptions$1(storeRef.current,updatedNodes,when)}},storeRef=useRef(store);return storeState=useRef(initialStoreState(store,initializeState)),react.createElement(AppContext.Provider,{value:storeRef},react.createElement(Batcher,{setNotifyBatcherOfChange:function(x){notifyBatcherOfChange.current=x}}),children)}};var Recoil_filterMap=function(map,callback){const result=new Map;for(const[key,value]of map)callback(value,key)&&result.set(key,value);return result};var Recoil_intersectSets=function(first,...rest){const ret=new Set;FIRST:for(const value of first){for(const otherSet of rest)if(!otherSet.has(value))continue FIRST;ret.add(value)}return ret};var Recoil_invariant=function(condition,message){if(!condition)throw new Error(message)};var Recoil_mapMap=function(map,callback){const result=new Map;return map.forEach((value,key)=>{result.set(key,callback(value,key))}),result};var Recoil_mergeMaps=function(...maps){const result=new Map;for(let i=0;i<maps.length;i++){const iterator=maps[i].keys();let nextKey;for(;!(nextKey=iterator.next()).done;)result.set(nextKey.value,maps[i].get(nextKey.value))}return result};const{useCallback:useCallback,useEffect:useEffect$1,useMemo:useMemo,useRef:useRef$1,useState:useState$1}=react,{setByAddingToSet:setByAddingToSet$4}=Recoil_CopyOnWrite,{getNodeLoadable:getNodeLoadable$3,peekNodeLoadable:peekNodeLoadable$2,setNodeValue:setNodeValue$4}=Recoil_FunctionalCore,{DEFAULT_VALUE:DEFAULT_VALUE$3,RecoilValueNotReady:RecoilValueNotReady$2,getNode:getNode$2,nodes:nodes$1}=Recoil_Node,{useStoreRef:useStoreRef$1}=Recoil_RecoilRoot_react,{AbstractRecoilValue:AbstractRecoilValue$2,getRecoilValueAsLoadable:getRecoilValueAsLoadable$1,setRecoilValue:setRecoilValue$1,setUnvalidatedRecoilValue:setUnvalidatedRecoilValue$1,subscribeToRecoilValue:subscribeToRecoilValue$1}=Recoil_RecoilValue,{batchUpdates:batchUpdates$1}=Recoil_batch;function cloneState(state,opts){return{isSnapshot:opts.isSnapshot,transactionMetadata:{...state.transactionMetadata},atomValues:new Map(state.atomValues),nonvalidatedAtoms:new Map(state.nonvalidatedAtoms),dirtyAtoms:new Set(state.dirtyAtoms),nodeDeps:new Map(state.nodeDeps),nodeToNodeSubscriptions:Recoil_mapMap(state.nodeToNodeSubscriptions,keys=>new Set(keys)),nodeToComponentSubscriptions:Recoil_mapMap(state.nodeToComponentSubscriptions,subsByAtom=>new Map(subsByAtom))}}function valueFromValueOrUpdater(store,state,recoilValue,valueOrUpdater){if("function"==typeof valueOrUpdater){const current=peekNodeLoadable$2(store,state,recoilValue.key);if("loading"===current.state)throw new RecoilValueNotReady$2(recoilValue.key);if("hasError"===current.state)throw current.contents;return valueOrUpdater(current.contents)}return valueOrUpdater}function useInterface(){const storeRef=useStoreRef$1(),[_,forceUpdate]=useState$1([]),recoilValuesUsed=useRef$1(new Set);recoilValuesUsed.current=new Set;const previousSubscriptions=useRef$1(new Set),subscriptions=useRef$1(new Map),unsubscribeFrom=useCallback(key=>{const sub=subscriptions.current.get(key);sub&&(sub.release(storeRef.current),subscriptions.current.delete(key))},[storeRef,subscriptions]);return useEffect$1(()=>{const store=storeRef.current;function updateState(_state,key){subscriptions.current.has(key)&&forceUpdate([])}Recoil_differenceSets(recoilValuesUsed.current,previousSubscriptions.current).forEach(key=>{if(subscriptions.current.has(key))return;const sub=subscribeToRecoilValue$1(store,new AbstractRecoilValue$2(key),state=>{Recoil_Tracing.trace("RecoilValue subscription fired",key,()=>{updateState(0,key)})});subscriptions.current.set(key,sub),Recoil_Tracing.trace("initial update on subscribing",key,()=>{updateState(store.getState(),key)})}),Recoil_differenceSets(previousSubscriptions.current,recoilValuesUsed.current).forEach(key=>{unsubscribeFrom(key)}),previousSubscriptions.current=recoilValuesUsed.current}),useEffect$1(()=>{const subs=subscriptions.current;return()=>subs.forEach((_,key)=>unsubscribeFrom(key))},[unsubscribeFrom]),useMemo(()=>{function useSetRecoilState(recoilState){return newValueOrUpdater=>{var _storeState$nextTree;const storeState=storeRef.current.getState(),newValue=valueFromValueOrUpdater(storeRef.current,null!==(_storeState$nextTree=storeState.nextTree)&&void 0!==_storeState$nextTree?_storeState$nextTree:storeState.currentTree,recoilState,newValueOrUpdater);setRecoilValue$1(storeRef.current,recoilState,newValue)}}function useRecoilValueLoadable(recoilValue){return recoilValuesUsed.current.has(recoilValue.key)||(recoilValuesUsed.current=setByAddingToSet$4(recoilValuesUsed.current,recoilValue.key)),getRecoilValueAsLoadable$1(storeRef.current,recoilValue)}function useRecoilValue(recoilValue){return function(loadable,atom,storeRef){if("hasValue"===loadable.state)return loadable.contents;if("loading"===loadable.state){throw new Promise(resolve=>{storeRef.current.getState().suspendedComponentResolvers.add(resolve)})}throw"hasError"===loadable.state?loadable.contents:new Error(`Invalid value of loadable atom "${atom.key}"`)}(useRecoilValueLoadable(recoilValue),recoilValue,storeRef)}return{getRecoilValue:useRecoilValue,getRecoilValueLoadable:useRecoilValueLoadable,getRecoilState:function(recoilState){return[useRecoilValue(recoilState),useSetRecoilState(recoilState)]},getRecoilStateLoadable:function(recoilState){return[useRecoilValueLoadable(recoilState),useSetRecoilState(recoilState)]},getSetRecoilState:useSetRecoilState,getResetRecoilState:function(recoilState){return()=>setRecoilValue$1(storeRef.current,recoilState,DEFAULT_VALUE$3)}}},[recoilValuesUsed,storeRef])}function useTransactionSubscription(callback){const storeRef=useStoreRef$1();useEffect$1(()=>storeRef.current.subscribeToTransactions(callback).release,[callback,storeRef])}function externallyVisibleAtomValuesInState(state){const atomValues=state.atomValues,persistedAtomContentsValues=Recoil_mapMap(Recoil_filterMap(atomValues,(v,k)=>{var _node$options;const persistence=null===(_node$options=getNode$2(k).options)||void 0===_node$options?void 0:_node$options.persistence_UNSTABLE;return null!=persistence&&"none"!==persistence.type&&"hasValue"===v.state}),v=>v.contents);return Recoil_mergeMaps(state.nonvalidatedAtoms,persistedAtomContentsValues)}class Sentinel{}const SENTINEL=new Sentinel;var Recoil_Hooks={useRecoilCallback:function(fn,deps){const storeRef=useStoreRef$1();return useCallback((...args)=>{let snapshot=cloneState(storeRef.current.getState().currentTree,{isSnapshot:!0});function getLoadable(recoilValue){let result;return[snapshot,result]=getNodeLoadable$3(storeRef.current,snapshot,recoilValue.key),result}function getPromise(recoilValue){return getLoadable(recoilValue).toPromise()}function set(recoilState,newValueOrUpdater){const newValue=valueFromValueOrUpdater(storeRef.current,snapshot,recoilState,newValueOrUpdater);setRecoilValue$1(storeRef.current,recoilState,newValue)}function reset(recoilState){setRecoilValue$1(storeRef.current,recoilState,DEFAULT_VALUE$3)}let ret=SENTINEL;return batchUpdates$1(()=>{ret=fn({getPromise:getPromise,getLoadable:getLoadable,set:set,reset:reset},...args)}),Recoil_invariant(!(ret instanceof Sentinel),"batchUpdates should return immediately"),ret},null!=deps?[...deps,storeRef]:void 0)},useRecoilValue:function(recoilValue){return useInterface().getRecoilValue(recoilValue)},useRecoilValueLoadable:function(recoilValue){return useInterface().getRecoilValueLoadable(recoilValue)},useRecoilState:function(recoilState){const recoilInterface=useInterface(),[value]=recoilInterface.getRecoilState(recoilState);return[value,useCallback(recoilInterface.getSetRecoilState(recoilState),[recoilState])]},useRecoilStateLoadable:function(recoilState){const recoilInterface=useInterface(),[value]=recoilInterface.getRecoilStateLoadable(recoilState);return[value,useCallback(recoilInterface.getSetRecoilState(recoilState),[recoilState])]},useSetRecoilState:function(recoilState){return useCallback(useInterface().getSetRecoilState(recoilState),[recoilState])},useResetRecoilState:function(recoilState){return useCallback(useInterface().getResetRecoilState(recoilState),[recoilState])},useRecoilInterface:useInterface,useTransactionSubscription:useTransactionSubscription,useSnapshotWithStateChange:function(transaction){const storeRef=useStoreRef$1();let snapshot=function(){const[_,setState]=useState$1(0);return useTransactionSubscription(useCallback(()=>setState(x=>x+1),[])),cloneState(useStoreRef$1().current.getState().currentTree,{isSnapshot:!0})}();transaction(({key:key},updater)=>{[snapshot]=setNodeValue$4(storeRef.current,snapshot,key,peekNodeLoadable$2(storeRef.current,snapshot,key).map(updater))});const atomValues=Recoil_mapMap(snapshot.atomValues,v=>v.contents),updatedAtoms=Recoil_intersectSets(snapshot.dirtyAtoms,new Set(atomValues.keys()));return{atomValues:atomValues,updatedAtoms:updatedAtoms}},useTransactionObservation:function(callback){useTransactionSubscription(useCallback((store,previousState)=>{let nextTree=store.getState().nextTree;nextTree||(nextTree=store.getState().currentTree);const atomValues=externallyVisibleAtomValuesInState(nextTree),previousAtomValues=externallyVisibleAtomValuesInState(previousState),atomInfo=Recoil_mapMap(nodes$1,node=>{var _node$options$persist,_node$options2,_node$options2$persis,_node$options$persist2,_node$options3,_node$options3$persis;return{persistence_UNSTABLE:{type:null!==(_node$options$persist=null===(_node$options2=node.options)||void 0===_node$options2||null===(_node$options2$persis=_node$options2.persistence_UNSTABLE)||void 0===_node$options2$persis?void 0:_node$options2$persis.type)&&void 0!==_node$options$persist?_node$options$persist:"none",backButton:null!==(_node$options$persist2=null===(_node$options3=node.options)||void 0===_node$options3||null===(_node$options3$persis=_node$options3.persistence_UNSTABLE)||void 0===_node$options3$persis?void 0:_node$options3$persis.backButton)&&void 0!==_node$options$persist2&&_node$options$persist2}}}),modifiedAtoms=new Set(nextTree.dirtyAtoms);callback({atomValues:atomValues,previousAtomValues:previousAtomValues,atomInfo:atomInfo,modifiedAtoms:modifiedAtoms,transactionMetadata:{...nextTree.transactionMetadata}})},[callback]))},useGoToSnapshot:function(){const storeRef=useStoreRef$1();return snapshot=>{batchUpdates$1(()=>{snapshot.updatedAtoms.forEach(key=>{setRecoilValue$1(storeRef.current,new AbstractRecoilValue$2(key),snapshot.atomValues.get(key))})})}},useSetUnvalidatedAtomValues:function(){const storeRef=useStoreRef$1();return(values,transactionMetadata={})=>{batchUpdates$1(()=>{storeRef.current.addTransactionMetadata(transactionMetadata),values.forEach((value,key)=>setUnvalidatedRecoilValue$1(storeRef.current,new AbstractRecoilValue$2(key),value))})}}};const{unstable_batchedUpdates:unstable_batchedUpdates$1}=ReactBatchedUpdates_native,{setBatch:setBatch$1}=Recoil_batch;setBatch$1(unstable_batchedUpdates$1);const{useRecoilCallback:useRecoilCallback$1,useRecoilState:useRecoilState$1,useRecoilStateLoadable:useRecoilStateLoadable$1,useRecoilValue:useRecoilValue$1,useRecoilValueLoadable:useRecoilValueLoadable$1,useResetRecoilState:useResetRecoilState$1,useSetRecoilState:useSetRecoilState$1,useSetUnvalidatedAtomValues:useSetUnvalidatedAtomValues$1,useTransactionObservation:useTransactionObservation$1,useTransactionSubscription:useTransactionSubscription$1}=Recoil_Hooks,{DefaultValue:DefaultValue$2}=Recoil_Node,{RecoilRoot:RecoilRoot$1}=Recoil_RecoilRoot_react,{isRecoilValue:isRecoilValue$3}=Recoil_RecoilValue;var Recoil={DefaultValue:DefaultValue$2,RecoilRoot:RecoilRoot$1,atom:Recoil_atom,selector:Recoil_selector,useRecoilValue:useRecoilValue$1,useRecoilValueLoadable:useRecoilValueLoadable$1,useRecoilState:useRecoilState$1,useRecoilStateLoadable:useRecoilStateLoadable$1,useSetRecoilState:useSetRecoilState$1,useResetRecoilState:useResetRecoilState$1,useRecoilCallback:useRecoilCallback$1,useTransactionObservation_UNSTABLE:useTransactionObservation$1,useTransactionSubscription_UNSTABLE:useTransactionSubscription$1,useSetUnvalidatedAtomValues_UNSTABLE:useSetUnvalidatedAtomValues$1,isRecoilValue:isRecoilValue$3,setBatch:setBatch$1},Recoil_1=Recoil.DefaultValue,Recoil_2=Recoil.RecoilRoot,Recoil_3=Recoil.atom,Recoil_4=Recoil.selector,Recoil_5=Recoil.useRecoilValue,Recoil_6=Recoil.useRecoilValueLoadable,Recoil_7=Recoil.useRecoilState,Recoil_8=Recoil.useRecoilStateLoadable,Recoil_9=Recoil.useSetRecoilState,Recoil_10=Recoil.useResetRecoilState,Recoil_11=Recoil.useRecoilCallback,Recoil_12=Recoil.useTransactionObservation_UNSTABLE,Recoil_13=Recoil.useTransactionSubscription_UNSTABLE,Recoil_14=Recoil.useSetUnvalidatedAtomValues_UNSTABLE,Recoil_15=Recoil.isRecoilValue,Recoil_16=Recoil.setBatch;exports.DefaultValue=Recoil_1,exports.RecoilRoot=Recoil_2,exports.atom=Recoil_3,exports.default=Recoil,exports.isRecoilValue=Recoil_15,exports.selector=Recoil_4,exports.setBatch=Recoil_16,exports.useRecoilCallback=Recoil_11,exports.useRecoilState=Recoil_7,exports.useRecoilStateLoadable=Recoil_8,exports.useRecoilValue=Recoil_5,exports.useRecoilValueLoadable=Recoil_6,exports.useResetRecoilState=Recoil_10,exports.useSetRecoilState=Recoil_9,exports.useSetUnvalidatedAtomValues_UNSTABLE=Recoil_14,exports.useTransactionObservation_UNSTABLE=Recoil_12,exports.useTransactionSubscription_UNSTABLE=Recoil_13;
