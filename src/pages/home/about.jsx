import Footer from "../../components/footer";

export default function AboutPage() {
    return (
        <div className="bg-white text-gray-800 w-full font-body animate-fade-in">
            {/* Banner */}
            <section
                className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('./fashion.jpg')" }}
            >
                <div className="bg-black/50 absolute inset-0"></div>
                <div className="relative text-center text-white px-6 z-10 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">About <span className="text-blue-400">Mahee Fashion</span></h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Celebrating culture, elegance, and individuality through timeless clothing.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-gray-800 animate-slide-up">Our Journey</h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed animate-fade-in">
                    Mahee Fashion began as a small boutique rooted in the passion for blending Sri Lankan heritage with modern elegance. Over the years, we've grown into a beloved clothing brand that empowers individuals to express their unique style with confidence.
                    Every piece we design tells a story — of tradition, craftsmanship, and beauty.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg animate-zoom-in">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h3>
                    <p className="text-gray-600">
                        To craft fashionable clothing that celebrates both individuality and cultural richness. We aim to deliver premium quality with heart, ensuring every customer feels beautiful and empowered.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg animate-zoom-in delay-200">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Our Vision</h3>
                    <p className="text-gray-600">
                        To be a leading name in fashion by setting trends, inspiring communities, and making elegant style accessible to all.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 md:px-24 text-center bg-white">
                <h2 className="text-3xl font-bold mb-10 text-gray-800 font-heading animate-slide-up">What We Stand For</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[{
                        title: "Authenticity",
                        desc: "We stay true to our roots and infuse every design with cultural depth."
                    }, {
                        title: "Elegance",
                        desc: "Our styles are designed to make you feel graceful and confident."
                    }, {
                        title: "Craftsmanship",
                        desc: "From sketch to stitch, we honor quality and detail."
                    }].map(({ title, desc }, i) => (
                        <div key={i} className="p-6 border rounded-2xl shadow hover:shadow-xl transition animate-zoom-in">
                            <h3 className="text-xl font-semibold text-blue-500 mb-2">{title}</h3>
                            <p className="text-gray-600">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-400 text-white py-16 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 animate-slide-up">
                    Be a Part of the <span className="text-pink-200">Mahee Fashion</span> Story
                </h2>
                <p className="mb-6 max-w-xl mx-auto animate-fade-in">
                    Explore our collections and embrace fashion that reflects who you are.
                </p>
                <a
                    href="/categories"
                    className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition animate-zoom-in"
                >
                    Browse Collections
                </a>
            </section>

            <Footer />
        </div>
    );
}
