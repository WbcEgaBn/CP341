class Group {
	//I think group class is maybe done
	constructor() {
		this.boids = [];
	}

	goTime() {
		for (let boid of this.boids) {
			//boids know other boids
			boid.goTime(this.boids);
		}
	}

	addBoid(b) {
		this.boids.push(b);
	}

	update() {}
	display() {}
}