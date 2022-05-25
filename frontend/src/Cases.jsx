export default function Cases() {
return (
<div className="Cases">
    <h3>In German, there are 4 Cases:</h3>
    <ul>
        <li>
            <strong>Nominative</strong>
        </li>
        <li>
            <strong>Accusative</strong>
        </li>
        <li>
            <strong>Dative</strong>
        </li>
        <li>
            <strong>Genitive</strong>
        </li>
    </ul>

    <iframe className="youtube-video" width="250" height="250"  src="https://www.youtube.com/embed/bZL5OB61XXM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    <h4>The Nominative Case</h4>
    <p>
        <li>
            The nominative case is the base form of the noun and signals the
            subject of the sentence (the person or thing that performs the
            action).{" "}
        </li>
        <li>It is also the word that tells you how to conjugate the verb.</li>
        <li>
            {" "}
            The questions for the nominative case are "Wer?" (Who?) and "Was?"
            (What?){" "}
        </li>
        <li>
            The nominative case is also used after the verbs sein, werden, and
            bleiben. (Warning: Here it is NOT the subject!)
        </li>
    </p>

    <img src="https://en.easy-deutsch.de/wp-content/uploads/2018/10/nominative-declension.png"
        alt="Article nominative case" />

        <hr />

    <h4>The Accusative Case</h4>
    <li>The accusative case is also known as the direct object</li>
    <li>The direct object is the thing that is acted upon.</li>
    <li>But: We also use the accusative case after certain verbs and prepositions.</li>
    <li>The questions for the accusative case are "Wen?" (Who?/Whom?) and "Was?" (What?)</li>

    <img src="https://en.easy-deutsch.de/wp-content/uploads/2018/10/declension-accusative.png" alt="" />

    <hr />

    <h4>The Dative Case</h4>
    <li>The dative case is also known as the indirect object</li>
    <li>The indirect object is the noun that receives something (normally that something is the direct object, which is in the accusative case).</li>
    <li>BUT: We also use the dative case after certain verbs and prepositions.</li>
    <li>The question for the dative case is "Wem?" (To whom?) or "Was?" (What?)</li>
    <img src="https://en.easy-deutsch.de/wp-content/uploads/2018/10/dative-declension.png" alt="" />

    <hr />

    <h4>The Genitive Case</h4>
    <li>The genitive case shows belonging or possession.</li>
    <li>It is used in noun-noun constructions.</li>
    <li>The genitive is also used after certain verbs, prepositions, and adjectives.</li>
    <li>The question for the genitive case is "Wessen?" (Whose?)</li>
    <img src="https://en.easy-deutsch.de/wp-content/uploads/2018/10/genitive-declension.png" alt="" />

</div>
);
}