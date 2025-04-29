# Individual Project Phase 2


Backup: 

let art = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/arts.json",
    });
    art = await Promise.all(
      art.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let architecture = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/architecture.json",
    });
    architecture = await Promise.all(
      architecture.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let design = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/design.json",
    });
    design = await Promise.all(
      design.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let film = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/film.json",
    });
    film = await Promise.all(
      film.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let graphicDesign = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/graphic_design.json",
    });
    graphicDesign = await Promise.all(
      graphicDesign.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let music = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/music.json",
    });
    music = await Promise.all(
      music.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let painting = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/painting.json",
    });
    painting = await Promise.all(
      painting.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let photography = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/photography.json",
    });
    photography = await Promise.all(
      photography.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    let fantasy = await axios({
      method: "GET",
      url: "https://openlibrary.org/subjects/fantasy.json",
    });
    fantasy = await Promise.all(
      fantasy.data.works.map(async (book) => {
        book.createdAt = book.updatedAt = new Date();
        const synopsis = await axios({
          method: "GET",
          url: `https://openlibrary.org/works/${book.key}.json`,
        });
        return {
          name: book.title,
          synopsis: synopsis.data.description,
          cover: book.lending_edition
            ? `https://covers.openlibrary.org/b/id/${book.lending_edition}-L.jpg`
            : `https://covers.openlibrary.org/b/id/${book.cover_edition_key}-L.jpg`,
          CategoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );
