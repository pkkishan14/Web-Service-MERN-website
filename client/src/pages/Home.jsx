import { Analytics } from "../components/Analytics";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p> We are the World`s Best IT services Company</p>
              <h1>Welcome to WebEzzy IT Services</h1>
              <p>
                Are you ready to take your business to the next level with
                cuttiing-edge IT technologies? Look no furhter! At WebEzzy IT
                Services, we specialize in providing innovative IT solutions
                which are optimized to meet your unique requirements.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">Our services</button>
                </a>
              </div>
            </div>
            {/* hero images */}
            <div className="hero-images">
              <img
                src="/images/home.png"
                alt="Home page hero image"
                width="700"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      <Analytics />

      {/* 3rd section */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images */}
          <div className="hero-images">
            <img
              src="/images/itdesign.png"
              alt="Home page hero image"
              width="600"
              height="500"
            />
          </div>
          <div className="hero-content">
            <p> We are here to help you.</p>
            <h1>Get started today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              lets discuss how WebEzzy can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/service">
                <button className="btn secondary-btn">
                  Our services/learn more
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
