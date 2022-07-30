
function initGeneration() {
    let generation = [];
    for (let i=0; i<50; i++) {
        generation.push(new Genome);
    }
}

class Genome {
    Genome() {
        this.moveset = [];
        for (let i=0; i<500; i++) {
            //TODO: Implement moves
            this.moveset.push(Math.floor(Math.random() * 10));
        }
    }
}

function execGeneration(gen) {
    for (let i=0; i<gen.length; i++) {
        for (let j=0; j<gen[i].moveset.length; j++) {
            
        }
    }
}
