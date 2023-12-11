import React, { useState, useEffect } from "react";
import { Layout } from "../../../../components/Layout";
import { VMSsidebarItems } from "../../../../utils/sideBarItems";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";
import {
    DeletePasses,
    SearchPasses,
    getPassPdfBYPassID,
    getPasses,
} from "../../../../api/APIs";
import { ToastContainer } from "react-toastify";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../../utils/ToastAlert";
import { setPassID } from "../../../../api/Auth";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function VMSDashboard() {
    const navigate = useNavigate();
    const [pdfBlob, setPdfBlob] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    const [passAllData, setPassAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };

    const transformLeavesData = (apiData) => {
        return apiData.map((leave) => ({
            id: leave.id,
            passDate: leave.passDate,
            requestedBy: leave.requestedBy,
            branch: leave.branch,
            visitPurpose: leave.visitPurpose,
            cardType: leave.cardType,
            companyName: leave.companyName,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            allowOffDays: leave.allowOffDays,
            remarks: leave.remarks,
            passStatus: leave.passStatus,
            createdAt: leave.createdAt,
            updatedAt: leave.updatedAt,
        }));
    };

    const getPassesData = async () => {
        try {
            const response = await getPasses(currentPage, pageSize);
            if (response?.success) {
                // showSuccessMessage(response?.message);
                const transformedData = transformLeavesData(response?.data);
                setPassAllData(transformedData);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.error);
        }
    };

    const HandlePrint = async (id) => {
        try {
            // const response = await getPassPdfBYPassID(id);
            const response = ``

            const binaryData = atob("JVBERi0xLjcKJYGBgYEKCjcgMCBvYmoKPDwKL1R5cGUgL1hPYmplY3QKL1N1YnR5cGUgL0ltYWdlCi9CaXRzUGVyQ29tcG9uZW50IDgKL1dpZHRoIDI3MAovSGVpZ2h0IDMwMAovQ29sb3JTcGFjZSAvRGV2aWNlUkdCCi9TTWFzayAxMSAwIFIKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbmd0aCAyNjYzMwo+PgpzdHJlYW0KeJztfdtuIkuTtV9oa9Q2FLa790hzxc3/GHPXLZvMAgrce3f3J82D/1TGikMeimNhwC4pZdkYiqrMjIzTihXT2f+bDuN2xp17uPOjOze++J0MYxhXPu78uB1u87O6+M0MYxjXPO5eH1phmVdBXu4vfj/DGMa5R7vnfxxpSrVispi0YzDGhvGhx11dBTtqdPwVNh//52v7c3b8RYYxjMuO7SIAC8pXG3k57VvGd/9+vZtPBrdlGDc6yOkumkYb56IVk80O37zhf//ntG+5V2Fxg7AM4/bGnf/S7uH1U2JitWLSvv5M/+rhizZX24jJ23Pw8QdhGcbtjc2+vVs9tUJBod12BG2yebGetJLSkzPeXrN5bC84L2uxYQzjmsfdy6jdw5sNvJi08kL22Ob3Ooz+dnX7RZuLLx9J+u7qwcEfxo2Ndt82TyHMVbU7eXPyy+/upMBX4YtW4Ys2Pwfvfhi3Nu5mI5hGvopGEySlDz8FX0SJ+40AbnSWHzL4w7i9EVKErErSEbb3qh/NAktvc1nyjI7NaQ5jGO8/NvZVu2kXmU7xxh4jXMpp4eL2u0j05sEJCjrr4o8/jGHsM+5mD+3uDY5D59jomjZmBZNp45sf/3UUl14+4ks3v//4cvFJGMYwtg9EurrEpGaFQsMxQrg+SRG0FyFJqSddec9hDON6RohrVXc/n9vA10ZY3p5DZnACMWnz6Qqev5uJz7LRQSdpAZUUChr0FzEYxjD6HXfLv4KYjFUcxHMnJ4IDX2f5dhdUFUUPWgPsVFzZMIZxphGAWC2qhIyf4NHf8784NrU812nffq+kbAIgfzDAhnGd4279X53/8sEk29hjy7PplNlD+xULNvPengdJGcYtDoC+zmd9EbpMJGU9SMowbnLcvQS1sngvSaGo2uvDxR98GMM4dHDU6ywgxlRSFj2jy4YxjHcbCCCfFg3uvDg58lk4+uJPPYxhHDru5t9aG+z1LJwqAbpsMGb1hITl4k89jGFc1VA0i0jKRmpmg6QMYxjRiHL0g6QMYxilcfe//1OQlMH6GsYVjNbpuBq8LlABEvgijz6kOy9+b8P45OOuHrX4xutIWCCBUhtJoRpkP0SJh3Hhcbf+L4r6Xv5OKN61jkH+q8ChdJ442zCGcdC4EhQibC2rUAj3NSRThnEdgyu2LmnhtO4ScbMkxWItmuXy+m4Yw5i2DMN0jF/y6A51KJlCAVHSoFOGcS0j1G1drBQXtHhNVoZMLHnzbxefn2EMg0awfFo75+73BbZlwe6iTMrZ6sWGMYzjxt1rYBu+RNkU1f8qJFIGFTy+DJIyjOsa7bb852trg73jMX5XB6tvWSIT648efBi3Ne6aq47htPXyjjtkvcsWBZFFkSVp8dhqmeuGe7WRkNlVZGw/0mhbS1890S6QJKvHd+hjErInVYHumILDq346s5z5EYbCmTPM6i1EOzfuPJxrIVDtZp846YuosLGLc695uoke3BsjYcCk9Tylq9GtnD+o/G0J58NoWe773Algzk8Aw3bMJ7fS8zEEtweWy16n1N2Sf4oydgKWEOyqp6QGOMRWj4VIl0SGVzeTQwFQ7RbU302Mux9jNDu4EUmZJgmO5kmg78e1ykJi0QV9sZ0M/C0I5nkq9PufpdZYrSgGcvGb+QADqIwbsSj4nu9BF1mzRdSER5hXB6kYsLYSXyskrltMqDve7dCwtFg1NFBuCZkvfj83PdBCmpHkF7+fA+88QHmV/CGEpMQe01G1xI80XBW9TiTD66cU0FXQJs8h1XhLUzSlY3DzdD31UP7Mg9uxPV4cgnjMzdcjMKXYIsQ6ZM83L5KizEWAEu7UMGLZ1ckrduEJ33Vr84P1/fkcSMmqG9KG1zbaOA/tNNj5tzeTLe/9lohuzQDgdOySDg0Ic1dHd5O1WtCGHn2RLn4/NzqwE2pBj9/kZphKzGr9HCmXEwepkvcFz5xhiblTBkXUb/AwvPiIsgYg171VSZkSHTG5J0R0v7/WyMeCI2C3H1+FO0bWdfBWzpSr/cBD2+DyHF78lnp4KHQgYjd2p5+emGobEXt7AoFqfRtJkx0TIp3BSUu25uhHWOj3m0BqaGWbgNz44Zk+nWcVswoqBjn9CTLsNBbBJqH/SlLmYzWab0XD5p7ol+sgurn+AbYT6wJ/xHY56PMr3R4JJ1ZXLA7mX9re66NtIVD5kVPvufrsw631uWbPjzkoxK7ryR11r3xsTtG2F+rmMWcjpFHa34Ok/Pjgpnt0KtYhwTokIveZt5A3aacO7QzQEnE4Zz7qQOyrXe4KVvctlAy84/zcF2fDNneDNUINcL8P8cOPObDQy5B8JHOCfs/ORkK/XPyG33t+Sjl3wAg5TYAo8cDt9qEHfLHFRDiX2nMSqIMoLwCn5uUTnZmh3qTaPHj0IrVx38iF2F2klM/WPHQY1zBC+KtClI/CGoSXKxHLACx6++HxfSenBPLRw6Tl0X2Ao0fojkFSPu4AophSKlRco4wERcNj9En2QzsPmxn4ET0s7K5fXykXD8oR6v1R3xiKeBiHjlAZ+oToTSipRtj8368Fb+Vl9Bk4yUGfmx8UdIa0odEH/ElTR/C/z2SafsIR8BjPam8H6WBwbJW3tPgMNcXFeK/BxFZTsUUpQU8h4ksQMw7j3QY0CGF72Je/+/GlXfpf3/KjMhD1fOScC+o1YoUCZfrrm0iQLd0KLD0f/PQYBs5GclWQcQ5q5TXEdszeMB+5bRD1rgkpBclZTMjyDN4cg0uHsoXPMSi5ppl6OidDgKsFKlBVtcsO2FsgtjpmNiivlKhRN5bqcp60caBNMNV/H3E2hpGMdt1/Mvor7k2J3MHm9XTzVHmu4dZH0ZFHjbxJl7TYJ29YdpGrHQJfH3/gzKwF/RUl0dhhiXYCEnAf6yAFmisuWiRX3YoPUA1S5UTO3UePBw5jKpgWqbNYRswJgcGpYGDgUx8lNMqI8XH6IiArI37lHnH12oLtB4XyKQaiPXDqKyEV1Dd4pmkygVA04/gorj0QXK8TfYWMsdZx09MgOPKhdonqMijt+FEmYRg7RzgnQ4twx3hy49gilf8zrVRCkcLtF2W0vdqzkJfmGbnyooWvoKJnHDkpg6R8mgGdIjhJQoJFxvlITBF9kWCTmb9/WwO1ny6Co4R6BGJLMAplFmZg/ayF1bfPMjGMgwbWndP0QJXHwBXEwXK1cuOAc8a5ZQplnTogd8pNOkYaZagS/WQD2L85k5B73hIu0yCtXJhjlhKU89uj0MT9U7wihg3rQfHji3lxxDHzMWdY4LBc/CmG8W6D2Se4mwYJzs/MiydO2nlU3Ne+h/iNf9wGe7ne+Ub2wwPGUfERm16xQqGwBvJNY3D5Loac46cb7U74KQVKYaB1ZmaBxDDjjdRwbu7G1Eor9dyXysxD+oBTiYyF1xEoXj4SGfUHhsANozi0pp4aH5OBkce7SPvEcnFHFMc3RUQJ0GMi9YQXLeBCx8zTPgYRMXMO3C3/6u2WCA8A2pNh9DLGvRMrQZVsrK9AnqD7n8sxom1DMR+uIMaRm4nVNQ/D4MQ51h9f8gTKVLKN1G+3Ndgq0L/3HcoAI1BXx7dhHDG4mUufy/R6fydsgeFQBetI1mcK1V75aUzZh1tIryDivQ6EKq/3+mIr7FntvKds42SjTaZCzMJkiX3elav04sPoZVBEt+8DnAu4JhLL0ioVtwteS3gYCg1dd36h5UX0TLoruEcyxrI+OAT6AuR+/g1vax6pJqVntT7olFvQKbr/ya4QSSl5K3izrWzyXxBbvnqWEhwI7I5Fj1OsCF5MJMal8WG2UQ/76q0tFG9PUk4hw78aSQmwpcPO9qD9ud8fo2o1CGwwUVOBFJowqR628ypxba5nwKVaPKIf+is/I+3/xCMjz+WPqeHy3OttcXCdY5Lxv3lJIfKrKxxzQ86/j6QQgvGQHQtXRSDlcorW4PcuLD35ubSLZpW+2V0pUe2dUE8banoxMgsPaIpT2tiUZzDDgdyqCJhstdZuRlJqjo76pBfkdQwjIHtaX5wZOUCztJel7HyrVkw9F3kr8eZvbfjZWN5JKTxOXF4jzBjT6GX/c4gPgLd0G2vI65XIWOgomBzaiw2pzF0TcjOScvhB8d6rLHO4p6To0+29po6LLwglS2XC4unPMrWi2Nov+k6WlIOE9OwTSEq2pdeQw2eMWfqnRNlEAXmrevB0rDT3K/lERGv5uHu9BknpZaH9wZKCxf3zd7s99otHKZcCsmzEPvGA6+T2CRlsHDFWwXGRVrqGATeKJhBd0RmXknlhU6tJpfpADqu9W6W087mZ/D8F4o7Cm29LUq5pcdOFO0JSXsIp+s9X8Ul3vP+VW6tTO5UoCFxJ9Dhe3xHvwJFRMWMc4Nfh2kN4gyK4Q9Eid48qbXu4JEbXACGJjlRpMUvHl1aisOjM2fH+QVJ6WeujJAUf3FgLZDDMdqNN2isTVQvt+YCQRCPmXyk6vf3Xj/GdpB0jh3eErXgFrj3C3e0tfdHduPmJYpP0DGFdo6U3+BR1mWmndMdMahqx2bfRxiAp/az10ZIyC0VYmy1BPT52+pXyFYuJfT/SJa5Qt4WvaDhAx6c0oq+XNmgRkYNXMtIJnJdh88AYW4VC4WKSnfUO04sZa4NSJmzYLrHiafy8ktIjFv1oSZkK8I8Wbpfl0F7ZMe+EKaiHQVK0VWhrCWkY9fbanN6vk2sIgnE4jrEoa6ZsopCXTxeo/VddWeA9FMRigsL57gnkJP4Tyu33s9Pw2c8nKSAr4OhuP8t9gqRMBa3EJEW7hCXqsR7dA2UhC7uL8/ueuShnJgZ7OWGxek2xbTSNGaRNn+XP3+mDr5msu1svs3cWNlI9OZRb8jNISgs3JYfxhbMJ1IWkYy2OXPFTJOX7CMJCByZKXMs+voZDF0T79sCvB1K40gbgUAAf129QRoEZrGr3wCXAYEwgU9GTwpOi2SN3I8+hzKj8s0olRToC+HKPdUQwSJQ2P8kDMjO8M6r84SUFQVRJWS45qOJCFaGv8jTEMYt+mqRMZwygbbhXHd3hS+lQrdnSIB0RMRpxQVO27pFaaXRHhZDRZcBgsrd1DkmWuf1recMnVHgAT3IQoAT3gn1LUukCF6vLZG3XDHx8SdlY6S9MEU9Z4NbDZWQI9286ddGPixL7cbzPKzCKeCPahRipYQCLNQi841LYUx/Zc0sRgqlvPFyfsmm9wwBj/+ZmePJVq8JDyR5hNUImKKmCrLkdwCoVefhiNJkv4ePr58SXwRt2Pf6Hl5TOje0Yd9eHDXakpNRRrjwATsJSMv0OJ9Pj1ScPnUI9sZWCf7Uo4o6jlbbifGJ9NPHazicXpZvB9uYtfa/7sKNFsklEPkQvroyTEhV7qh6Zzhg/mfAKvozyGS7f8I1LSmtpH97cENNLWDLSy3vkMnZc8AhJoYhldL6xecAN13Rjm8SHRgBypmKFrOSYyREMvBpqJf3erWDaHkdgsQtBPGbMUHe7I3UIUYobYdw1FWJZnglb5NhxzAkm+LHmkQoWNAtDZkYrUHtksm5ZUoLlUB0auoH7vH7iA3l8OonH8fkUCm8mHNTE8BZ8bX6FIjZWC3DPKYN9moqVVWqtMpUwEbdoj27jHXMr4rmbV5hLNgS6C36Wk05k2VzVUZ5oSsqaDkDB7fsOu2t/6MutS8rhYL87P1bHWcLF9QGh9fIOPDJHz8jAXC/gkGRwI43vI4iDj1tArmLmovjwjJbbGX5FF5sxpQhz/2LSrhotqwk9eanoLCkUWuiE0Yg8rDfu7sc6EXLBuwKadP1UEBOglPfMER8oKST4GFvetvW/eqm9K7O6rK/DbWw5xvHgreExOigJ1aOk4LMBiCJuOPRCbFSLz0L7X2PFWIvY9ibzsisfQak3P053zuEFUEfOVazEg0dWQcsb1Wk+EnW6xIt1SOgvOJrnuLM2Z/ynMyYr3lyZBIqpWnDBDs17qqRQtV1SsrTIPkisuVQmsHwsCAJdR+hDF/xnPdnx7UVJgcW79/N+H2kwhEwRgXZs7uFYb+UkSfHaplDzzrOxOQlNTRMZFXQmLzjqm2UPOVzc4deTORcDP4Qev0fmn8654qS8uaUK26DLaGT2FSMpJuq1ZNLmOlMcRGjjbU4/PP5Gds6Ro2+emEtZym34T0mqovjO1jeN8fj030VwqeYTfYPsWMoKrZ86VUx37IsP2/3QO46J0GlXiOP8ytnJoyLGp0jK1PqbZgthQWl6Z5JeHPHzVuy/8LSbHY5/xbEg/ItKuhpGPZmu7jLbZxQTDoDHL4atzgyZ6UfqcJIUyPxNswwnGUkTdqaJWkV2FzZb89R/jl7qhrqEfc56k8VE//udOdiZ66DLLESXEMffeJikVPsbYCqb8gur+2L3gQO2+imSQrFKQc+Sb4IWIc8MlTd8PhL/pO+iZL11kIm0pKPyAjtzmRKY4FP+jNSsmKKcBHLzjOvu4DBhrW0IgjRg85juECexL26RaSSCT+8nhJT3ANvrN+6UlEaBapBuOdAc4z91133B1vV6zreJPxedJDCBrGKy8GlRUvtJylRijDsBCSs2vebsRsXCy9R2B9tgJ0pK9OCG1w7PxTRfZtWkDQSPbJvBtmzPz9zsf8gPW7OXquKOPX0AVF/s1Ug3k5dtUlLpP38X7tOZiuwm7eeoYsLfGOnoDqncdvPbJQXZnLGS7S+DkbAxGn8+A+Ydx51Uuy0LWM12jcQqowdZTIxdxyCTonezXVIy7o7S2yp8xeb+KRqJxASL8Euh3fle03i6pDiGudbcBEQ893Z9H8sOuGyVuP3QdMYI9ozFN9pIuYOzuY36bJJiHMPoRc+E5Jnpi00YB9KnEt+TXVpMuzePAtTBtqSdhp152Hm4Q1Jq0Q5hLYhEWl6sJ0x4W+nP1RM3g56ggMglgvDUvk7fKGL+81kLV+cl1367pLg00NohKcbieuMS1DiifpAt16OkTMVboXK/lebRMGloCWFaIVj9S15JEkX3zEicWVOY/LzlCgWLjLXfp6QUnRQn5lCH6UVINtsDgmJcAJROKFpuvuUe8a6VCddYq/uoDvV7efSbK//7lTFmdA6P1OgKvWsDOKEiHIVaNXTlzYvkxWzM4N/fjM0zjt5ZhwNw0REB2y4pBCLaDlZ3D2oxOokPj5Mc91Ssxx8HTGY/kkLeyptpktLe4T1az1OQMBLq2FbPNkBoUzUpOl/Avfx8Lm/dxeSI+98lJiNMbIypwKkVe0y6ZB7N5dMFmvOjUXfgSJlask2OF4Xr89FRHUEvua9Hv3lPCXMbfJAK8epS1R4MnvbQeBShLlznh5H6Yrh4F+5L5G7rG8Y4cDw7ibVItA0cEbSj+7vqKnmWXiQFq6xpQTQKAX/7+gnSPcvMDEXSxpP/EgywXx0GGIULMgIf2IHnYIvNAF04HLKuW/qRphAQw2zA7sqStp649ZBVxHJT7vLwkJdeeaf1FSG0K95X3NKlrqAKSa2E/aYuP3lSM/ajmc2y7YkjVhDePEon4VBJmT3cdYih2VSV3s+8shu+sBY+rRttpayWex6L9uxVUu7hRmFaHqLg/BJc9/ZYVhtsUWgA2n5wo9OzTitYTV8Vs293cZilN0kp+K1j5NfyeyBflVCjP7JPlbCUwHERos+zjGCBKnhtHFrsWVIWj7pM0A6P0CBtWC8oTZOtg04nGB6qULNWOI69HiL/XCoJLf7VHOzR655xBSXe/ut1YgPdsMYF99Xkmbt7e66G06BiDAZxUt2HKG7YxpSh6ENSpmQy1ZUcsxoDcQIgjL3XFWucUm0sbvvfjkPb883HlLw4fg/x61vt0O3aaBoo3/Og7MuAN/S8eQSA9v+Ce/kldpdYZfFswNRs6WiOTS7v6dHTdtp8F2GNyK1onuAwmrgxXqTTj2xIHx3d7eskZSQm9CeFwkhdHmV9YVd0QThok1M0Cc3gNAGUAIrMHoudKfx+H/k7wV/uUVKmEthhKBoUTSOF8I+Jcag7JEZLtv+iqkZyiousWRkaeaqafavf14pGDNxynXRA4YlyN2qEyc/1XUtnxCogbxBDHkFyYrxw9zHP4bIo2zjJb6BPSZGloc0vJhNZ+LRAm39RuGZzM+T4i5Hmwn8pnkwZtJ/PkQEpBhgtDYE3Dvfoda46ImCRT0GKT7C4svfMRgqZUEkejRG+oLtlFF/YhHGIoDdJqeB78pmJtMIblw/nBj+J0rLDqqcMeAGHz8ZeHszn87B8hzQtsRLRvVFEAuctgKl4M/BGZtvyAcdFLkTkxRdnQIKuhhMS68hH+nklZQm0c06bD1uLjLG3kOfyMZ7H8/UXbDqyv5Dv5HYcFfvCRchry2PvLwUXFddcmJq4yD3nftY2xE2OAB+2LOwcyO1PUrAV6Xix5G9ePNlcrVRABOURMJrzt44MuIik9X2oPLCEww8FpFXXrtM9GeXTH/g4yoLY/5ZZAWF71LkxyfHhpHWyY8qajKIcEnSsI3+ApJjgA1e+SFZiNJXoFo/2FUrBz9A+SaVgNk4xOXCKBQHIrtBRkoIroPmOrX0b52IOGadAYl1hfUmm6ioyGmkj1dYGu0fI0QJ9e5aUEPd+i7YEJpnmhzD5dnuLXi4eRGh1l+18z/BCi0YGg1Zcekw6dF4mCjazOuEzsyI1HbZ3VjtGm6REz9U6lV4SXpnaoty3077JYJ5cPYm2FZ8dC4dLncSqsYdHj0WHG0VRfYq2lXiPYZUtGRiZZULxBoIcLx6lRoCONT0xjtApNMMykwqxLsTEsOeXnOZe2sCsmIUM9vaiXCotgogop3qWlKkIOJEwzExsEIdnR2J6rTZb9K8WgVlQKyE1VjKNYveNJ2fC9PLlqnMEQqlV0IpdWvF5E/ww5dZz4aXcXKlRY3udn88paJ/EgVLYm0Vhmg4t2Tut+GgvSSEHxLELT5n09RPi1eS8OI5nkudLZw697e1J3RCrjEgbrnk0T7gmMlPHevQ/+MhFyikIOOUUZMU5R8lBkjEWcT6JbpVmWExBMn0dFFP7SxxNOoek4LLrrPRb5Jdidz/irD1HUeINxj5jlwmNjPBD9C2/0RoP00XQrF1ELjjrxJ9yY13EJJbYzmGVxGyVELJgrd1DOfqqUEpPclfHixJ3wTujpHhOqayfNczljB3CbW4wISsumZE9Ty58zQ0QyamfczpGzDaKRK2fO+9kT+uLthbz006t7edsgM5Epz1/pCgjvjJ8g+SSVIIgOrukiIsRJ0SwN+aTwm34coAXp3Exc+EYEJ5wngg0DkY4Y2a2d+Sx1DHiDFJln1bfhDksYdKwCgbZGD2CTzEVd+JCppgWBrHHpvgZJcUzt2d2UmE+SdeIKDn2ViQjuQiGK1lrIh1iTlCtqPWaj5UUxLSXvKZziSFU2N6kE5OQl2OsyJKVmk19rjgcFwxdvJ+eNPERziApuPKCS1dey5BytdgpxVNsPOSkpqmU43PC8n3Pi8JmsC2y26OfF1pdJ+lj4rigs0uBNCWYDUl6OerFZd3CRSP3aWBy0xlHjN/67Gu5W1LiWmNBT4ky5e1R2Z0cHioYP0TDrgaYeYPsYXEorMd6iKQE0WO8pWxsC+8Uk4Ds/MaS+XDMjQtmIa3zieBz2IQYd5XmnVFS6MChAp9ErXjO0rrYNgMwNXFVeBKKJ56LYIqwjvJdsd6ryXt5EbXNnPGy4yi0Eq4Ww26eK0NtXGvOKchEIYKIYN/eNKdKisHVcLK4Qm4duQ+2PFemwMRxqsUX2IFwMs/lsFI5mopdkScft1RycRAYZlXi5ljPHYQ2lX4FVWJKAKFmQePEBCSFdhEZbHR0vJiqHAoKnUdSVCjWWaGc7AenuW+EE3+WzmQS86Ja8fwVbiwUWOkqLMqEdR03nPmb4hV67s1aNL2UnDlztXwWjvPMNpDbY5n4nFdSkkreNXv0NH5K76SgsmtOz5GRgxy9sX/kfG6CFy8lKgSPEcNsb4++/UYKNhK0iZGNzERqcDiMi2gZopypv64zSMBcmvOyvCeVZW+MJUBgyuSMziMpU3HVaT5FBa9MhiXZKlnp01QiYBn4dioxW4ssys1g7L09OiKROOSpsZp/lhDOMKUIvFEU8zhYEZYSHMtaCUg2TB8JlMMkRZaenPE1A6UEBMXVQNhXy0dGNY/xaDbtTpuQrqPGv6nqWu2bo4di8sp+FoWt5HEEA2llh0SDYkfkotbmWySZ4jiUHe0WglWz10mB7lnmw/YuKY7BXcUA6Vt2qNLNpLFihnmUikHCOfyIbVxchf2psWjPFzdVzbaKGydYL6zm8jGH4an4JzHA1VNSIAAJXT/Fu6U6vanlXpKyMGS5NqPXcDUQYsLPDAuvQkKZtcmbRVSaLb15z2yEPSD6er8cvdxM+3NWRX+mjzNG2MHzHojqgg0wwEbkSJUkaR1Jvjhzq6INzxIlHkltL5LmpOBeYgskdky0biVN1n+BJYkK2cTl5wBXHe9qz3ZpBn7YdufJKiS6m07XuL4MR0FdwAa0d+5QUoRXqI6egGFieb4YsGjyzv3aCZ0kKeyqRKXu2BLfkB4VHr885CI+tRZ9c4CitdYMxG7Gln9RWDLrC+Q/jh0iSYh4sawEqZI9EaPTg5jwOoq6XHQcqlZtxfVT0W33m0+RFaeQEanpnEfx53P6YjFzR69zKCP9V5fp6yU+fIikNOboSKZoCXouff8Pm7DO1M3sAaumm3BUKm2Tkts073wEJe9hkjJPMJmV+h3G1JT9E825KVZtYymWqUmOenXnEaMIZ92OHD2MH7oZQu9TaGg+yUIBmZjYhXMcIrYnZ9dWEZ3VxCaZ9Bg9i6SE0+D7SOcNJGCZYwJuPXOalZD2Wi2YkeCFMyQ2RJ0xVsGosO/JjKWhS4nRLpXvDHuIvt0xDVcxGWRex/kcjDHTO3ikvkwGXYiudhSh2b71KY5tGEoOkgS9ZfUpknV6k8wFicyXUOVqIsxvXJ+iyUoTv9qqU3C0yusRIqvj4yoLlZalKG6zY1BRgGye9VPq3TdP/eqUVk1HBePp4a/Hpqnngloxugb+ixsnt6ELlJN9OW4oI5rXBljoqO+AFhcexBsCnDdOtC1NmJECXFa0TUlvJndxY0ev+yR6zzrtcIpiHys4NC37das/QFLkpKXoaH7eSjJRfq5Mogr457Fqoq7r0DsXpX8VJYWuxmBydo62Gm+LRw4I8/34rVyvAvciH1Ow0CTgjRGi/qLEtDnTV4yhEviLmJ4o6YBg9xJVrnVlJahY2/wXx6Ds7QW7Y4mk7G3D4LatK+c4DU2/MEBoOmOAViMgwHgGyDCLemorolWnZc6OvKWypyXbqmJ6lZRdO4oixl3VJXNDr7qdhXjHvmVJEcNpY2CQ9eUlWjVJL9hIQZnBzxBAffvX0VegJNCEuNVbUXHoy6OHM27VtK8S+kTczzoCceFETdzJrlgxLYT0sPOsi2sQvDDZhTGzs2TrrgcZ6ZyswQ+jBoMEUpYGJkG9FzN55PdXkcY0kE6sEfyv2KL7GTXjxmePan5xi1z36rlzMi6yvhZMd6xYVvsedr62nwkGYzmloIrZgaWN0ZOkkAWeyMU84lWACnt7FmybipiJr+IkyUNMNCfsqmDSEJ/neIieLfw4pcjttgfxpr3pCrlR7DQpbm3k8Iw0V2Fu6X7gyY5gnKhCrLQ3yu/YIv0Vt7pD86ajluYWJUUhmlLbbuO98ro9/9lblLTpKoYKkzUlWXh6ERCdPdrQ9CQpU9aY+ud3JriLvFcD/3sxasUoEZDH+ippFhlkqjKJxTGMUhEcgcPNHiJJOZQDzTP6izQF4cEo6ex5BecTjaKgP0JJUv7vv82ZwPxOQSjgdwAbY8yzrk4Q5gD8+JIi7qFj0EXkxScCQvExATyznSZgyKTYnz5OMIPNibRfVWmfkuLSr8PupaOYXVFsmJUCaAHQ9UisMCllmu9O29OTyBjW6KCqwr+ceZwMA7/Xg5Dx03AzvhnbvbJAduNBjydV80Guf8WVMvZA8Jxq1COCm2JkZDVY3++fxfrSR14q/ExNMsd4CaDlTaHW5pDkEiSt34SZYesdOFPjUwv5PSQFeaJRenGkzs0O8cLzxu2HXECD2LKvIrLdx3hpgVp5ZhWT8mdxamJM+2GSAqTcGO3OpYmS5DppkL/5O+PN86ZnPREazFGHgtI/A0vWfpFCwCVwSilN2oqF/mCSMpWQiK+A8aBYSjGw5jmZ2EdD7fNLSlU4CWsGc/q40HL9HNXa+3F6/GbNFKZiw4vxKXU6BKhQSeEg1bxA5brvnNRx5SzdEqktAnKIsJRKrqAd2GRS4xB1x0Gh8DMqOVXJ6wlfsS8g5yNJiu4N2kg5oq+Of6fS0fNxU/cmKXz0aTH4A/azZy94xk0EPJjBYuILRJVZd2QsW7BPDMzAm8D70sDjl9w+9ZAEvZFHbt8mSsGZaDAgkRxs7xJqKo2ccbUpsx6BoOmfrwbuzgQ1jpmOxAgx7LKfU1IiebHASAI3rjmDv2Dk8H7W1AUlZaq6gFeZqnQ15a1kwjhyVQtIHyIO/+LELiXrhfNnzgmphsEkTaUX92o+HfgUbLx5RVfC3G2kz6YBl64LBt6dCQhDsvRS4Qqcu0fwgSJgXuosTHyM8VSfWVKmclhpYa8kUIwj/wpmyH55RPuXFJ9Wi+MVjl0DEolCkgrQ09YOv5d9qHflslyeJFC8JWUiWy7YRaSSHPNdNAVk8u6nqNPk41SdKdtGnO/EaENcgXxJhrSBEkHKzUhjApA2wrR4Q+Ms5wn1Tv23UOD2CSVlSueGsoqxV5v12TnH6F9SEKyOQ6MNh+nmE8SNSfZJy8xYOuQQ9ry4eYUmMvKxXbR8NCc2s6x4QXAdRucLoRaj0QO1iMtqCSQX03FkxszDF3k6viAHbdy9igMN1Cgx+mup1ECcTi1Ut31YSdllZKKW9oSj4yokxWnzX+43ZNsI3uPrZJ8AO8fb6Q9b8rSpfqaYQzZa+IKrEezSRiMGgKEuDLfYgSEjdXy0XYLpnUQ3sHEfXtgAA94+LjbxyqCL+3Fj0AUY9IsApPEpQm4sgtffhEWB/zJIyoVHz5JCZtXiMdokPqLbbf9EWQrnjFwIw/oRtXcMF/ly59JOPYisNtopbyo+xUqZTPBfChHv4iguPwVtUfGvHXj58CyoeGI9KJIbBf1YfkUEKMMo1Hm+gjQt4weZTzhD9HAnxeCxGH5YSRFnXJLvXcMxPH7723oczqA+epEUwqsQwkQQaE67QkxnDHYStaJ7YwyiDBExEihBiNEZLsxCNb/NnPOQFCHbybTSfluLI2wSnFQ8JIlhpTSDQm3n4tISC6T03C+DUvASpXlTtlgYrlx3huUwdWQfX1JoLDhpcm3DJnH6qE9Rp17Q7z4s99IcxZ4hW/S9mmfXBm16nZlxeTwDeLg2Si0W+pRxpds3//n7CEnBCS9NCZnpQkEC69jNF54rmw9quLSf7GqpPZcdC4kzGSWZEJIyoKOpauB4m/zGJMUziPHahr3DXiRFkhHJivsIggXTHcVWj0q70RZ2mUyfraqTU3f9FG1U6kNBn6o5fETCWMIkHyDvJJt0G9KL6mfUVhubf551c5CIX8OFe3QUSFlrUmnYtZljLFA/kkJJz+sZvII3M/qRFHZV8uu/6aKHw99kRhwnEGl/ttFRRp7bPH7DqAY31u8CH5oxh6REbm+uiYKkiDdBmY6ZMfZIqYmb75l0NJEUAht79tQk+O/Z2flh+LqbuE2V/H5CzrEsKew4X9HwsRdw/aMXSfnBRpTP1FZcqItdZ+sI5Ox9DfDCtVIyAjclpZqvnNn3UgrKr7DHLSW3R8m7NokQYP9U849PAh5GdnXJ/RnbVjjEhBneo/Ex9k3kZBCxIqNOCpC9oUeYl+loTpKULPZ+8YGTbXsZ71WNPiQF20l4L5NzMucysmXLasaPICk/TUqiZnfPwk2JMdsbv1isJvbKT5OUMfxxug2qjFtraHcqCsgU46ikUHDg53M0z+uko8EItqidKHqE1b6cfgdKynuk6g64QzJQi5JCHi51qegiNL5pSalN/XVjZCE+0HiTxFEFx1iRt6cITMK1gTCEKH+9NhkZIqdSSans0X3wI5CtOAsyy9CCqQjjIva55szD5rhFyBqsTUGOnqIHTOujTeW+Nx6NLzeY+CySUjNZqy3a9R09IpOx4JKuM+mpviTFaxQLZ/vCBHxczBeRiFJN7Ru4A/saRN93wmYj6oMgIgh8cUhtbjhn/AmS4hXNdSfuec36YhlxrsIfWXOrkd9sffkxduk6Pit8lTJmSNyDIoSYwEerQD+dpCy5oZ7Qv3tOK2zfxnJEO85QXK2k/OYU4ZwhOhrznCS7FwpIHr/W93CUqdIpskGnFyOPNgVTszZpHk+QFBuv1o4qU3Hhk1YUjoEuIqTgkjUQApwVeZM+Yfbj8nzBmPkecta3JynKm5qRp7ld4e4mao+I+tntrEeXkxTsNK4Qn1IUVHz8JJ39KrsilhQfwj5iiiwfkVmIgsZMauTucbDD9ArcJm2KvzpuV7CgVajhckbFkKrCNrakiyyb3ugRZyCdXnNM0ReJzpXEjRM+8Gp7z5ePKSm0D1GWqD3QEfqwFkguJj5jjXYcrrxOSXGSEKxwQsppsEYcOHqzKB3OiWPbi6QsuN7wh/GjTWwWEyJ/egboHp15XOq0hxtGGhSyExPZKX+LsFIICMHuUkrKW65FcVIWMebzjW25EzIptyop0kjCc9n4ysRLu+LJDbe04+bmpmsP9+BYPu7l5ryzTpmzqSnhoOZJPf2EoFiWsjYBfxCQsgGTcMf5CuJj4YVyLHuuFDuKAZvjDGM95BsDZtN8enw/zZMaYBZ4sOBsY065LPFhuThQ1oV+3Eeuxc1Jitwn5Wdtoooi8MUeN6DER8/HgpFPpxa4yq9GUqjb9Up7HMABJ93BqC3zIJVqVYHBoBjEGDAu2ZmPYsvBIqpj2NixOw0KS9IofgT6Nc8NaFBTn4Ww5uY8pHSMZ0lZpiFfAEpBtsM4TC8Lep4+j7ciKSoFsNunEvBMou7c+gEbiRainfm02gJBe2n9eQWSMpVo6jKOpjZP1jtOt5l4/bTNQOFY8G4wJ+o1s+/gOAXJ83nkzZsLTsmXnAt0bQxJaUPHRlIEP1kzr5Eb6/1jxTOzk3aImRDsalCM9lCCcZCkAB1xntQk3M+Mz3OHpHCVt9kqFaxTOq+SXqJEQ/pWaIsQLa6wfl1cUsj7oBQDShEfsFJwWJI9wwFA8eglzswHi77fj/QNFN/gGHL7X6HgO7r2nL70X6ksi9tTelNlkzTNlFR7bUpWa17unOVJmP0SdOVa5+3UhThIUrhOqpc9kM1quJO82912SVF1bL0VymGVEwHhI9t64MqBsC0+8G6SUo/vhO3H4oHXT/DZbTntqwkAcvMLfYq6KpDkA/pSqVOjRSvCHn+0TrFdTr5MEy/bm3DKKmZt8izvolO8acKS2JwkfW8xYh9i2EPOcbqfpPBsG+1MY5Za+0fNJBX4jGCLthd80JyRYwaS7ZLilc8z3gOdOjdoloft3QFguhzhtvQrKS9c/1jrJsdeWhUyBRpJFutLAepp+znMMwfPUfRhqU78wTyr8Txz6jOs71Qit8JXWZf8DsdsAJ4tLsdvBgrUqEXB8FsyNHDPpuGCM0uKydOJmMi5zeUMeLP0KUj6DckbYj2orrTnc8Nen5K5+0iK1J+e3FCmcHuHmmG9Sgo2f/OYcFWZwFG8Xp4JKHJJyVpX8741vR1Jar4Lopjoi0/mmfG8VV4Yokn35gUePEo/VZQUJN+tsN/DF0uioB0nyfEPslNS/Dhyr/AzDO2IOtbOwoTw8Yz/rEUKLDy40kgLdZGorW7VTtn7Soq3HSj66aqsc27771xGUtSQiILby8cCmarnqIUQuUjT8Dr1MaEypJ+ajxv6yFl9wmaDpJgAVyoFdYH0mG8Y20DjYKvUFDQJytiiYAc/ITDHG0ovniopzsAk5NFovHFWSAq6VRYYR0FP+usbVxh9U8FBA75HvaZ8BWvnAySFRKzhjNWPAxa3DS9nTh+I1yRE8y6SUtSJOHiXj/aExEEUB46mM4NVEFAc3U9memGbIbFY6TFoC6OoOOgUSaED/+0pEsB53JIj8ybCtpGZNAdsFl64k8iAH6df2sE6LvmdniWFeAPyjSp1Q0J3YMGKjlNFjisRrEJEmIKLlfITuwE7+nQfjz4SFs3F77m+AD5trj+Ll6Dmmn1XpSt7HklBhjqrYMV8Lh+T4719kbBh1vUIFIvcBYmCq0LBnQc34oIO1Atz7sMzq/yBnHjxTla4F1lNkGUbh891igUSi75jqvZUUrikJZoBQxsbvf8V0te/pDjuDFiUFIiDBChMmAIJoyoSIpxyFZTmvAOjaCGmB0mK3FvcZ7l7HUl3PyMTbWMC1DmurjBF+6P6T9EprnDcsfJ9Sk5UTR7lZoCNsno2aJO3Cdmp3LmxbbCgq6jxxJFP5MYSXuPHide9S4oVxsZV0i5dU8TWnOkCMHswoZjssnQ/h8eN97K+lqVjv57ozrfDxb+47BcRmdnIPFE8yNKgirwjJIUGMm4FtwVuoMRFfYkhXBaUXK23532/90RJCU5fYdu8PWPfCnm7WO85RWQTd5WdF6LiGlUTmUpq2LmZkThHxzxRw7VgXqO7WB0rKV1b2q570ff3aZk/thlqNpM33+9vbBwuKR2N3uB0k/+YhcW2D9CVP2yVFKYNOVpS6rQmFN8okts8RpqikL9m80bCGueWlNm4+Nk7479HkR9HJ2p2uCXmYswOxNsmPqmSYluSzaOYvqJvAZkwqoGiOxRDxUhKqF8O677xE31WkxLr3PCetJ1l+wrDvRK4GgMSziMpvsNAkjt3HO3ffyAUMOq8+EKNyQM8+nzEeA+k0v58K+NVkAWLzRthO9nfADtJp4wwpd+zqKmTKpJRdId/UuIUBe3ILb0ZGhZfcRLwQd06Xnq4EuSjbV45iumrIObt1tWtBXNCyPatsf1jbHyl2J7JNj+cjsRT81FBtHlzePZjqSf2ihLnm1lLL9lPt6wIgsitS7/XRsRcR4G8CWmeJCnpzq86tZh8L6l421d0zqDlPb/0FEkh8+CftD1QS4jqmX84KYnNeoKgE6JICvOZ4HFmsl05hwJpsvFhhvScFiLWm0TNbyU00XrAeja2LSGeNnAxIk+S8ppkTqtUyzjh/88zg8e3UDlSUpac1aW9R2yWIgg1q/56UvidWaNxGixKTeFrtQROkhQGFtJZBNDp9pBvi8BnNjYKvknc6fySgq/bqIlZGgSDDVMn4a8HKkNI32mPIAQ37rkfaClaO59E/HLOUOf1UC1omIfVADOKbxEVWyEaOf+GbS+yTJLyO0aIxXeI/D5D3fR1wpmzc9S7pHB5VLa1eCezZcJ+CpSFCYXR+52JgKGAYsznIV8hun6lUO0TJUVpcyp05t0nObJSpPo0icO8g6RsdEpXCjjhmkCUuCrsHyEjVV7f+Pi17vwqnOq27R0KSQ5uBlF4IonDG5AADDCBqJlUkQi7PrUXrZckj8ayRjxLppSyqZILCjKzf0khFFauUxThORYNGKb3SaIxLD7G2SeRaaQDFFqt4V+Jv8wFR6daXy50QqebqRk6u+eGX3H9V20a4ryDpCy56C/CCZOCiHaLdOWObJJIUmLTKwkyyxNFdI58LGeo/iOf6JV3Ee15abXpxlI0kZ4AbGTqe3wp7cgx1WiWHBca2NmjZzyqEcx+krLVlUCImP40v6t5aVMqY11BcudhkIcP1pmkCPHO6ZLyXUh+xneHskygHc9/sa2yx22cLikS5PTZWvzMCmNp2rskBVXz9xB20RoWdQyv0FTWU/iiDydFb2nNzqzFAIjDTsAtCYDj7KXKO16yQoK+sqoQr9QplR+8vyVryaNA+LslxY/LJjodVpKpFwoRCssLacCaX6eOBkDcjZH650ZshQCslP9QwOoUSfFj3RWuAxXQNWrhkOeute8gKbQ34nwcFCKMwAyj3iUpUmySWCmWIozOru8miEEUT/FxfaqkUHzAVCACnU7rwnY7/tXqSgNpJv+ioFMqG37BzVPP6ER7eultdywueqekbDtIlf0mS0yEvoGeBc3uzCWXSMsaubE6/tFhPg6WwEMPkuINnrPeTzXIkEIPt1+g+ERJeWGdQsyHTmiamGc7TqjxA3ZIinSRyB0BiUYaikggE7h3JBWT9iEpnDujWDRRjRF6h6SgTuNs4lDcSTKrICmjzPIU6zoWn1W4wimVzjslZUtu2o1121vuFFuE+JqRC7FdEcSQTbX8kJfgQH2CTpFwdAMoCDb8ocW/Euvb5zZOlJSaqSHm0eax3W9tu3B29L7Er2hbIticLj57rTufkOfTYVLqT7rX/W9WvFhMalWVlKR5cxSnWB0mPfBsCWT5U9xt8goMFd6BtYEidGAme5AUn5Wl51uI9p5sdbZVopu34SZRQ5Z2o5gHhL92X5AUYj/bqRoWvMOVm+UQ3zzZ/Ht+8GTUva5sTBOqcc7ctPgeTzjNmO12moZS+ezFCprWq5mQRve2/GtLEVAInlg8hrmrGXMrpaC+sRpgBTOS7795LORT3DjREbxjx1oD65nEFRj+Y0+wbkkxdJdbtqL4KcFaIAKB9n7YZqBK282LxA24GUDgCy6rI2iA9PEI+eKEdJe2PfloW5wO4bxamm6Dbr9Acddjvo+kWOtdgkVeae7Mm4PWXsVebXwIh5uPRUlQr+YkRyRNa2H4eykZ4TTgue3mX+/xTioKNkKKI4tCuELUJsvBIaBEUoA5X6YfnHJMOP1q0C6ZVhF02gP81r9OwR3uzNO5Ss14x0h7uU/iSxF/RGNQYzWHcl+GBg6HL9irIkHiejhGI3dlBrnqLdp4ByVHRFI8R7N3qpVeJIUcorjnGpbj3yiDDy3pY1vdRjBIxSRFwW+8eayBJ6fKMrbHwlEsrPX7PQJ/BPu2gp9FxrnhX7pz3Ds4hmhOZ8xU7CtsIdRTWFG6jx5ca3aYnYOu0ETEAmeQlO4QsZ78bAyvRu191uHn5v5tKPuF/1XzG8h5oVQ4UfQULw4ffBT5QRA61lk1A6UormI/viTu4kofUFyk/eGO8pg1MwlYaN+ZJMUzKjWmIsGTxliXMJlVbKtL9q3K0bOR5wgiC2OoMOOEUlb6QK4C7XwAqBj9WOmCK9bmTtUK361Z3wLbMKewnVCzdjOizAJrDclm2IF3US0bCdqRPC1bJYWTONLCyY5FeHy2oA7+XsckM4vH7MoTkPECURwLLJ0McZd5XlZz4ItQkNlAOkuKvPyBIYLahOx2nh696BRRstaqpyf6tSOAg4+vmCU+wXvMjGNo4NNsxSkdEGr0mid7D4c9CBkAZCGDM1aKkgDXgclnu36nWSS2Iri0dtuDu8qeJIyEn6hffHSkZYukULpNgieRpxb/eURV8gvT0IkB7DgIJiYZufM+3tglSdG19sIlGK5DNVALo1Acxx8O0il0os44pbL9s71ISs1IuUY3DwSf7P/u9BlUxsI8bxIdWjAxwnwSWUGNYPB4zk8GSTJsOKaLYb2stzS3z5sUSvD22EjTYtvNFCTFj1VCM2KxviRF39O69iOddk9puPteiFBCHIYtKJrG1jwzxmdSn9ItKdhL83DqBh8W3pzS5pgjbn8xYU+QAZamNS2hu2kF+7S+xoJCYV0WJIVw43i6ztNJj182XfRfVHUrUS+2Y3GwC6cBRYrmE+uwnPQ4Tlo28CzhHkKDVOovT6+sywEu7JCWh2GL9RXiP0LEp/maMZymHvvRlyTlsuMgSZnKASUshYT2WTGhKD3jYpevYYcm70bqpEisWzSsXLAfnTLR7SHM8/NvBIa0sZ30sxSn+v3N3F6KPMRkWpi9NwwPonANceWpiygCqGo6CyZQfDKLUHFfg7E817Z585VEPKLAUaxrjnmEDycpU7FS6P1OEJvGN3RMg7CPcqHAl+ckBX3QYNR1oXuTFF4LultT/dr+GbrDd5E1BXu1AusCiXDSPUEMIcMnqYH06Hw4qYF7dmOZNqfTXkobnHG9cwIWeM3bQJu6rJKFEbYHuEKDpOx9tVcTr3aG3Xf7oEQnRRvI65xlFH89SgqJubRDpU7uL8xWFyyQrkXnTaVlDubZTTci+knFjw2HDqwBuRkZ8+1J60gRA/stJmyLWuBGUpAlIlMx0TswNgZ/yzqFThUKkB7bARkX/2SSEl2Z4qV7kttTFBoR/vQ8719SnGDq+AakUzz5KV2eGt2JBElmScJxAh9kEYfU7Glfa1urnpfSx/DUOq6gt/ouNcAedCrcuJNQWvaJSMp//oYkunIFfSuh+8WjPrOk6AI57n7YBFZ5GtSgh3z2fyShsHV/Hi4pbYAxOyFtBm1qPPSpSkp3TEN82Jise2q3osmGoyTBHvVIWfapUHAD1JI1J5Fw3E1YjMC84QWZT5CyLn1qw2vfIJhuDJLDoqTsv1LX34/+zJIy1Xi4lJ6xrvexd9N9zJ4kKVniG0G2f410aDu5XZLiK4SwUl6ae11o22fEJef8qUTEO553FpO8QX8ZEALJESWDaosHDlHNZlvVjNEpFaAdAZyArHEmKXdubAuWd995IilnULsnze35JQVftDHGXu91HJIkiubwIEmhcFYcy4JOUUmptCnqVklpiU286RtitBUsfEoGLcQ+uU8VyvpUgq/djyyqzaRWyaCKbnKZJ1Yoktnpbljryx5uQIQm3MU0yXtXrKhjK/tw3qndLjLeTVKOv0NS9wsjKaaEcMdnyVeK6yZUUqTZohAC+G1+CpTR4jGxXoDYl+OaYWBBoZjgcBwQO9t0cRQRaSNVKwBzZooPH3SCk6zKvNwCxnABnCBls0VJcSE1trdquBMclDUd58eDk/uf2OuWFHRbW8Uhncyg6vy4nGwG0ZRKCmdmp7s8epzJqxQfpUnM2hAUSL28Z1q85qQs9gGT5rVTKqsPE9xTvz6p03yQEFZxeuHyS8nez05JQVZ6dYCkTPPQB4vz9kY877cVr1hSoBESZHJ3M4Ly5Dvt3gtcXyIpwmNJvgZyJUUW2YJCmdL2W5vtF0LcajGKF7y3Kjx13mBwcmrYBMHuBEhTl8LF5NcvysYtkDOtgo4sqxa+m0iKs7Vd+z4yjFXLWFIKPlxqXLWk+IwKjJhn9gastvDXWgpFZQ9HkjIV35OUC+XoSwQjnF+roqLIH8bAFoVCpRxUDacJ2fdbccY9VnCswJrCwrLWltlRQcos+PUd2fY7k4tn/4slZW6ZGe41d3NgxzHMVZJ72opGe78pvVZJUfdT7a6DqeRCLIg5A2UbewaZR0g/BuT8IoTkJLsfW52RVg7CgLed6Si3IrCfy0hKgOcRnlxbDFcAq+OGjdRT8vRX2gvDPCmn/umJGqJC0r5dU3H8JZ7QoaA779ybOjjr3V9aWK5TUhC0XMZny+ExdmDJaquP7sHek4RPF0y8+auMJcalcj5ex9BH5vVVqCe3Tkj8mneaQwrIC1O38e/uLGDSZYCcDlcalpsAvVjzorUBd2XSi2tC57Bnhw1Wx4dkfWFhuUJJ4SU2YsJUjXZN951zOd/aXEZFvq1s7Ogb6RD+t1yfAsMsXndsGPjyhkySYAkWFvXuqxxaDhG9BttgFrK1YMBkvANRW1ECceEEWD9ziJijBK/M9uzHTN9kApWHK1PUAqTCovCAi4xrk5QQioyjhZqGSC2iPa7GHHS4Dsdt4twWXqRRouIJiTaYJfHr3KkExtu9kjx08FG872RKTI879M0DEy8B5qUwM9eSxUmgIDOtBeFLSVLaq2l1s1axOa5MP6YU8V70fmqG+WMqtnqYzGuSFKiABFSJqOxRHJ6OKWrdmFvBjvMV5GO/Ek+kfGPJ8SsksbUW3sL2aLgxBx3R9YUkBcTCbBRRYtEzaWeJPWYqTlbpAEeMS1S89CxwRtcYARRFfMzNk9WaCIu4fseWIR8/mdchKYYwIROTOOx/2GWd6RurAsisUEmlNsXZSt4Q2+EJlbEt+hCuswrXMYx5Z03K75pYyaSTsjZSnNmN+AjVo/0uVHUlH4kkxdIsLAyl1f/999EqFTeZJFlqqVl41/PnGiQFFkuTQY7XVKhyGgleu/NDwF9OJyB+q9T6EjstsUZo58S+PHjLwats6IyYmrs9txuEat9zMtNJMF4SntFyIEjWw2fMfrTzY4sXurgoKfbwX4nLlja/O/z+OYmZ1DpJrd97nUIXlxQsZeK+ee6kcGrFljjUcVsBet6XTFJQ0R9LyozhwS8x61fNQidcnVL+aVv5lCgf3296ma4Bf5Jck2jbXkhxilARaznkuDYBllqUcqgCkzOfc5oSHFDercO9ctBdCoGDDOaDeh838IKSgl5v8yrlR6rZ9T68/TSd7fo72V0zxgdKuj+hTaMtvRBq9Cq9ZmyKQH2QL0+dsh0fdJzgxrl96SzA1MQrpmKDka8B6Vai1JQ6459Sj0vPEXuvfIB4vVZGGj0r6JCZCVPfMXOCQPQ882FrU2VwcieaHfdwIUnBMi2zlmGyXY9y2cKixKzyDguK89BGZlhx6wbIoDIwlX3kK8EfsQqFxNB0H4Z5c4koTWm2KZr911R275oDHc4wYCTxCopyRJqUO/dRdkaUMlGB0TZ+C1e2VckLlY5TAuaY9rxBzzKYlGfOTr6/pCC8n2eXvMBHjzQ+GetoTAIqX31lZK8TjrjHdOeTG55zx5WiYWrhSyyUueKhULgo8nzTeNjM1BHqDHItN7+yRStxKUHindWyTLGjR8WqpKpMq0dIVgIcMtr88CXuqKKl8CPxaYTgXv9z+I6Ssq1emGuOTvL+iAxKM++VlK/yt/O5l/TKIXEApaTFdH2B0rcvykSJj+mUZz7aDz01fehh5qmibQ4PHaGGn9LckDE/cU1uqynig0vDy/lcOa6aTLqruIRML53Pg5+FgJpF5UJNBOZ8FPfBe6Pf+y6Sgt4Tjo2r5AEXky1g7wO+JYrzPCBXmLQpRHVG1s1tzQoueb2YmDNNEKCnooz/kem2s47krtQGmzGXjjzRa5xbifs/RhKRzy0TBkbv//kcfe+xnbjjx+G9lFOaCDMwSBL6MYDPXkf/nU8Aeq7E3KqZttR3Egft+0Xi9AmkxKfV7uwZRaSjANtTYWzBH8ka9MwJhiTtBTm8E/jwAel3URPeKxmpsHjD/irLUU/uktIbyhZZ8vxanfro4pJgSuYch/891uU0viO9shClrkuUJtAvJtV1CO1z4evOIynB1BnBU6YjN+f+kgOhjxQSYp4e1jjOrhiaCOuLZFPayQnH9TKJfFYwv5O2j2uuvSV3mGJftTkzz0O90s8UoWFooFcCB3hMRNaUSCYt7vqFIfdNVN4CVBjOvazpkgbfhEyvn1CVWo+rUkeGudE7cJGOTc/1LSkcUeHQVq5HRHbm8FB6mjHOAErNLzEM/8h0ys+swVDN2s3FbUNDt5p4UWJAeA1Fz5cqGDDvOdok6Va2vbsYvYYzOcFszzMTlE5miumRy2MCAtHF2XcwH+f2iCIpzakOaWn14Rh26BcObHK9KnbpIYHlXiQFhUueOaOIoajIxU0y4qre+QTumDhCI/k5Qt4zEiA3yeq4K5Dn4zdJMSRe5Eq782izxS00jC3txsE4zwMmgUiTuiOxrUaYV2nwISmXgwqIvfgmdsQovO/Gqam2StldQNPB6C989i3t0dzDswsb+XxSlhfPgTsKv8zZeGZTZHsZcllS9tjDwK5zVksletnRPGVu4xJ9Rwy0BpyyGFwYmzZfq/LQgVn36q7b8WwDreShWOsxCUp3owEB3z0hm7D3hrmHlmwfp6Daglr5qsnBtoAliyM10dSxBVWRglajOmeZmE9yN6T9rj9/k6rFXoUW638qAhHZCDPQdJg0omUI26Pl54bMfJZm9FDWZCXFF3jbMP9WLkgMCb9BO618SxOtTj3BStwxP2RFANF0j/TBfBKt46uW5klCEPK+5EJ7L5wq5MZKYzvTulGtlLhLEXnHJfO7xcOAAuK8eeRoc25MxxJqDo4wdTmk530hJo2YF8WZFDzx4LWPT7QV3A0kQX9RspKunEBJYdSFEuwOdr4+H5/E3zP0ImmXUNyltAfQVyjj2RaDzTLJO/F9GIvOwAwojlW4IHUD2cLRPZc7PO9ZinVkyxlLQw0xo4BngYFK/UEpniVjI+nM5WKCOx8tNK7QVdhCcve+9a14io1aREIk43lOrE3HVpk93+w5MxtBZQvHS6M4avO8Y2HwMC+Gc4ZeJxuGk7znZqrRpnJ00FHkczv3rxAvkJe95FGUNXqbjIY/spiUvQ8rm4uJHtHuYL/pmNmYjfXR3BgleH+yqivHlD4+joZtNgxHSnUPWFAf9R+x4DSCpc1oz4xgz8zSJ0U47t+v9Kl3ExN8OzVtoR6v7Q2YeJTIkYlfwcmSxV1GmRFkjW1LiFVBNdwJfE68RaG5CCgynMwSk3+vomnunmagR+sMcnncOLRbUPOE5J1US/XtsnVOgmOykSWQwAGUBTOY6Fmm4kd4ixVn0mDKl61GCOzkCiXZQsIsQfuH2i3l0QPPqf8L0bsFQ4sbIqepIr5ztiFBI/lm2r6j1p6DgRv7H/AqrlBbcHJKsXbcrSmu94S5LsZJzK30rnPiAXmC+9BGn9hAEnKSgzb/FgmquWUk5SakSbHYbOcnfzMPzoWutWmJQnCv9uQMbkjrTafMRVNSKI1W8E2NI6+RHx/z6jA4cDpjrAtNdV41TMbnpZP12nOQwinR+c9YXN3PowglElfZI07CyhpilRtg4v6TnIbJRDkPQ+NQXtdE3tB7");
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uint8Array = new Uint8Array(arrayBuffer);

            for (let i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
            }

            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const dataUrl = URL.createObjectURL(blob);

            setPdfUrl(dataUrl);



        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await DeletePasses(id);
            if (response?.success) {
                showSuccessMessage(response?.message);

                // Filter out the deleted item from the state
                // setPassAllData((prevData) => prevData.filter(item => item.id !== id));

                // Toggle refreshData to trigger a re-render (optional)
                getPassesData();
            }
        } catch (error) {
            console.log(error);
            // Handle error here
        }
    };

    const searchPassess = async (data) => {
        try {
            const response = await SearchPasses(data); // Add await here
            if (response?.success) {
                console.log("response Response", response.data);
                // showSuccessMessage(response?.message);

                // Assuming response.data is an array of data
                const transformedData = transformLeavesData(response.data);
                setPassAllData(transformedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPassesData();
    }, []);
    const version = `2.7.570`;
    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/vms/dashboard"}
                addLink1={"/vms/dashboard"}
                title1={"Passes"}
            />
            <ToastContainer />
            {pdfUrl && (
                <div>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfUrl} />
                    </Worker>
                </div>
            )}
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        block={true}
                        data={passAllData}
                        tableTitle="Passes"
                        addBtnText="Add Pass"
                        handleAdd={() => navigate("/vms/addeditpass")}
                        handleEdit={(item) => navigate("/vms/addeditpass", { state: item })}
                        hideUserIcon={true}
                        handleUser={(item) => {
                            setPassID(item.id);
                            navigate("/vms/visitor", { state: item });
                        }}
                        handleDuplicate={(item) =>
                            navigate("/vms/duplicatepass", { state: item.id })
                        }
                        seachBarShow={true}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        handlePrint={(item) => HandlePrint(item.id)}
                        headertitlebgColor={"#666"}
                        headertitletextColor={"#FFF"}
                        handleDelete={(item) => handleDelete(item.id)}
                        searchonchange={(e) => searchPassess(e.target.value)}
                    // handlePrint={}
                    // handleUser={}
                    // handleDelete={(item) => handleDelete(item.id)}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default VMSDashboard;
