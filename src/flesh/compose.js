import {atoms} from '../components/atoms/index.js';
import {molecules} from '../components/molecules/index.js';
import {organisms} from '../components/organisms/index.js';


// Registry sets to keep track of components
const atomsRegistry = new Map();
const moleculesRegistry = new Map();
const organismsRegistry = new Map();

Object.entries(atoms).forEach(([name, fn]) => atomsRegistry.set(name, fn));
Object.entries(molecules).forEach(([name, fn]) => moleculesRegistry.set(name, fn));
Object.entries(organisms).forEach(([name, fn]) => organismsRegistry.set(name, fn));

export const compose = (components = [], params = {}, query = {}) => {
// REFACTOR! WE NEED TO DRY THIS
    return components.map(component => {
    
        component.type = component.type.toLowerCase();
        if (component.type === 'organism') {
            
            const organism = organisms[component.name];
            if (organism) { 
                let slotContent = ''; 
                if (Array.isArray(component.props.slot)) {
                    if (component.props.slot.length === 1 && typeof component.props.slot[0] === 'string') {
                        slotContent+=(component.props.slot[0]);
                    } else {
                        slotContent+=(component.props.slot.map((child)=>{
                            if (typeof child === 'string') {
                                return child;
                            }
                            
                            return compose([child], params, query);
                        }).join('\n    '));
                    }
                } else {
                    slotContent+=(component.props.slot);
                }
                component.props.slot = slotContent;
                
                let x = organism(component.props);
               
                return x;
             }
            console.warn(`Organism component "${component.name}" not found.`);
            return null;
        }
        if (component.type === 'molecule') {
            const molecule = molecules[component.name];
            if (molecule) { 
                let slotContent = ''; 
                if (Array.isArray(component.props.slot)) {
                    if (component.props.slot.length === 1 && typeof component.props.slot[0] === 'string') {
                        slotContent+=(component.props.slot[0]);
                    } else {
                        slotContent+=(component.props.slot.map((child)=>{
                            if (typeof child === 'string') {
                                return child;
                            }
                           
                            return compose([child], params, query);
                        }).join('\n    '));
                    }
                } else {
                    slotContent+=(component.props.slot);
                }
                component.props.slot = slotContent;
      
                let x = molecule(component.props);

                return x;
             }
            console.warn(`Organism component "${component.name}" not found.`);
            return null;
        }
        if (component.type === 'atom') {

            const atom = atoms[component.name];
            if (atom) {
                let slotContent = ''; 
                if (Array.isArray(component.props.slot)) {
                    if (component.props.slot.length === 1 && typeof component.props.slot[0] === 'string') {
                        slotContent+=(component.props.slot[0]);
                    } else {
                        slotContent+=(component.props.slot.map((child)=>{
                            if (typeof child === 'string') {
                                return child;
                            }
                            return compose([child], params, query);
                        }).join('\n    '));
                    }
                } else {
                    slotContent+=(component.props.slot);
                }
                let x = atom(component.props);

                return x;
             }
            console.warn(`Atom component "${component.name}" not found.`);
            return null;
        }

    }).join('\n    ');
}