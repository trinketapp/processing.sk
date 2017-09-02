    mod.noise = new Sk.builtin.func(function (x, y, z) {
        // noise(x)
        // noise(x, y)
        // noise(x, y, z)
        // returns float
        if (typeof (y) === "undefined") {
            return new Sk.builtin.float_(mod.processing.noise(x.v));
        } else if (typeof (z) === "undefined") {
            return new Sk.builtin.float_(mod.processing.noise(x.v, y.v));
        } else {
            return new Sk.builtin.float_(mod.processing.noise(x.v, y.v, z.v));
        }
    });

    mod.noiseDetail = new Sk.builtin.func(function (octaves, falloff) {
        // noiseDetail(octaves);
        // noiseDetail(octaves,falloff);
        mod.processing.noiseDetail(octaves.v, falloff.v);
    });

    mod.noiseSeed = new Sk.builtin.func(function (value) {
        // noiseSeed(value); int
        // returns float
        return new Sk.builtin.float_(mod.processing.noiseSeed(value.v));
    });


    mod.randomSeed = new Sk.builtin.func(function (value) {
        // noiseSeed(value);
        // returns float
        return new Sk.builtin.float_(mod.processing.randomSeed(value.v));
    });

    mod.random = new Sk.builtin.func(function (v1, v2) {
        // random();
        // random(high);
        // random(low, high);
        // returns float
        if (typeof (v1) === "undefined") {
            return new Sk.builtin.float_(mod.processing.random());
        } else if (typeof (v2) === "undefined") {
            return new Sk.builtin.float_(mod.processing.random(v1.v));
        } else {
            return new Sk.builtin.float_(mod.processing.random(v1.v, v2.v));
        }
    });
